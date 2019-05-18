import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Orden } from './orden';
import { OrdenService } from './orden.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit, AfterViewInit {
  public orden: Orden = new Orden();
  public idCliente: number;
  listClientes: Cliente[];

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  constructor(private clienteService: ClienteService, private ordenService: OrdenService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarOrden();
    this.clienteService.getClientes().subscribe(
        clientes => {
        this.listClientes = clientes;
      }
      );
  }

  public cargarOrden(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;
      if (id) { // Si existe el id
        this.ordenService.getOrden(id).subscribe((orden) => this.orden = orden);
      }
    });
  }

  public create(): void {
    console.log('Clicked');
    console.log(this.orden);
    this.ordenService.create(this.orden).subscribe(
      orden => {
        this.router.navigate(['/ordenes']);
        swal.fire('Orden guardada', 'La orden' + orden.idOrden + 'con cliente'
          + orden.cliente.nombre + ' ha sido creado con exito!', 'success');
      }
    );
  }

  update(): void {
    this.ordenService.update(this.orden).subscribe(
      json => {
        this.router.navigate(['/ordenes']);
        swal.fire('Orden actualizada', `${json.mensaje}: ${json.orden.id_orden}`, 'success');
      });
  }
}
