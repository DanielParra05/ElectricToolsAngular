import { Component, OnInit, ViewChild } from '@angular/core';
import { Orden } from './orden';
import { OrdenService } from './orden.service';
import swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import { Ajustes } from '../ajustes/ajustes';
declare var $: any;

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html'
})
export class OrdenComponent implements OnInit {

  public ordenes: Orden[];
  public ajustes: Ajustes;
  public ordenSalida: Orden = new Orden();

  constructor(private ordenService: OrdenService) {
  }

  /**
   * Obtiene los datos referentes a la salida
   * en el momento que se despliega el pop up
   * de salida
   */
  obtenerOrdenSalida(orden: Orden) {
    this.ordenSalida = orden;
  }

  ngOnInit() {
    this.ordenService.getOrdenes().subscribe(
      ordenes => this.ordenes = ordenes
    );
  }

  generarSalida(): void {
    $('#salidaModal').modal('hide');
    this.ordenSalida.estado = 'LISTO';
    this.ordenService.update(this.ordenSalida).subscribe(
      json => {
        swal.fire('Acción ejecutada!', '', 'success');
      });
  }

  /**
   * Genera todo lo referente al PDF segun sea de salida o de entrada
   * @param ordenSeleccionada --> Orden a la cual se le genera el PDF
   */
  print(ordenSeleccionada: Orden): void {
    const doc = new jsPDF();
    if (ordenSeleccionada.estado === 'EN_REPARACION') {
      doc.setFontSize(23);
      doc.text(10, 9, 'Herramientas Eléctricas');
      doc.setFontSize(10);
      doc.setFontType("bold");
      doc.text(150, 5, 'Orden de Servicio: ' + ordenSeleccionada.id);
      doc.text(150, 10, 'Fecha de Entrada: ' + ordenSeleccionada.fechaEntrada);
      doc.line(10, 12, 200, 12);
      doc.setFontType("normal");
      doc.text(10, 17, 'Nombre del cliente: ' + ordenSeleccionada.cliente.nombre + ' ' + ordenSeleccionada.cliente.apellido);
      doc.text(150, 17, 'Telefono del cliente: ' + ordenSeleccionada.cliente.telefono);
      doc.line(10, 20, 200, 20);
      doc.save('constanteOrden_' + ordenSeleccionada.id + '.pdf');
    } else {
      doc.text('Epa colombia', 10, 10);
      doc.save('salidaOrden_' + ordenSeleccionada.id + '.pdf');
    }
  }

  delete(orden: Orden): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿Desea eliminar la orden ${orden.nombreArticulo}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.ordenService.delete(orden.id).subscribe(
          response =>
            this.ordenes = this.ordenes.filter(cli => cli !== orden));
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        );
      }
    });
  }
}
