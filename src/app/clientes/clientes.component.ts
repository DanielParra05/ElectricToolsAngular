import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  campoBusquedaTemp: string;
  campoBusqueda: string;
  isLimpiandoBuscando: boolean;
  paginador: any;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLimpiandoBuscando = false;
    this.getClientes();
  }

  buscar() {
    if (this.campoBusquedaTemp == null || this.campoBusquedaTemp.trim() === '') {
      swal.fire('Error', 'Ingrese nombre o c&#233;dula de un cliente.', 'error');
    } else {
      this.campoBusqueda = this.campoBusquedaTemp;
      this.isLimpiandoBuscando = true; //Para que el indice de paginador quede en cero
      this.getClientes();
    }
  }

  limpiar() {
    this.campoBusqueda = null;
    this.campoBusquedaTemp = null;
    this.isLimpiandoBuscando = true; //Para que el indice de paginador quede en cero
    this.getClientes();
  }

  getClientes() {
    console.log(this.isLimpiandoBuscando);
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page || this.isLimpiandoBuscando) {
        page = 0;
        this.isLimpiandoBuscando = false;
      }

      this.clienteService.getClientes(page, this.campoBusqueda)
        .pipe().subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿Desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>
            this.clientes = this.clientes.filter(cli => cli !== cliente));
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El cliente ' + cliente.nombre + ' ' + cliente.apellido + ' ha sido eliminado.',
          'success'
        );
      }
    });
  }

}
