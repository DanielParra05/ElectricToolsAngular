import { Component, OnInit } from '@angular/core';
import { Orden } from '../ordenes/orden';
import { OrdenService } from '../ordenes/orden.service';
import { ContabilidadService } from './contabilidad.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

  public fechaEntrada: Date;
  public fechaSalida: Date;
  public totalValorArreglos: number;
  public totalValorRepuestos: number;
  public ordenes: Orden[];

  constructor(private contabilidadService: ContabilidadService) { }

  ngOnInit() {
  }

  generarSalida(): void {
    console.log(this.fechaEntrada);
    console.log(this.fechaSalida);
    // Peticion para generar la tabla de las ordenes, segun las fechas seleccioandas
    this.contabilidadService.getContabilidad(this.fechaEntrada, this.fechaSalida).subscribe(
      ordenes => this.ordenes = ordenes
    );
    // Peticion para obtener el total del valor de arreglos
    this.contabilidadService.getValorArreglosTotal(this.fechaEntrada, this.fechaSalida).subscribe(
      totalValorArreglos => this.totalValorArreglos = totalValorArreglos
    );
    // Peticion para obtner el total del valor de los repuestos
    this.contabilidadService.getValorRepuestosTotal(this.fechaEntrada, this.fechaSalida).subscribe(
      totalValorRepuestos => this.totalValorRepuestos = totalValorRepuestos
    )
  }

}
