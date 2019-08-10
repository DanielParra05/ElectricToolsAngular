import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  campoBusqueda: string;

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.getAllClientes();
  }

  getAllClientes() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
    this.campoBusqueda = '';
  }

  buscarClientes() {
    if (this.campoBusqueda == null || this.campoBusqueda.trim() === '') {
      swal.fire('Error', 'Ingrese nombre o c&#233;dula de un cliente.', 'error');
    } else {
      this.clienteService.buscarCliente(this.campoBusqueda).subscribe(
        clientes => this.clientes = clientes
      );
    }
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
          'El cliente ha sido eliminado.',
          'success'
        );
      }
    });
  }

}
