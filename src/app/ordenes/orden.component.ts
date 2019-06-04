import { Component, OnInit } from '@angular/core';
import { Orden } from './orden';
import { OrdenService } from './orden.service';
import swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import { Ajustes } from '../ajustes/ajustes';



@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html'
})
export class OrdenComponent implements OnInit {

  public ordenes: Orden[];
  public ordenSalida: Orden;

  constructor(private ordenService: OrdenService) {
  }

  obtenerIdSalida(orden: Orden) {
    this.ordenSalida = orden;
  }

  ngOnInit() {
    this.ordenService.getOrdenes().subscribe(
      ordenes => this.ordenes = ordenes
    );
  }

  generarSalida(): void {
    this.ordenService.update(this.ordenSalida).subscribe(
      json => {
        swal.fire('Acción ejecutada!', '', 'success');
      });
  }

  print(orden: Orden): void {
    const doc = new jsPDF();
    doc.text('Epa colombia', 10, 10);
    doc.save('supongoQueEsteEsEl-Nombre.pdf');
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
