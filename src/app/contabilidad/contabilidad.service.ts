import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../ordenes/orden';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContabilidadService {

    private urlEndPoint = 'http://localhost:8080/api';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router: Router) { }

    getContabilidad(fechaEntrada: Date, fechaSalida: Date): Observable<Orden[]> {
        return this.http.get(this.urlEndPoint + '/contabilidad/' + `${fechaEntrada}/${fechaSalida}`).pipe(
            map((response) => response as Orden[])
        );
    }

    getValorArreglosTotal(fechaEntrada: Date, fechaSalida: Date): Observable<number> {
        return this.http.get(this.urlEndPoint + '/arreglos/' + `${fechaEntrada}/${fechaSalida}`).pipe(
            map((response) => response as number)
        );
    }

    getValorRepuestosTotal(fechaEntrada: Date, fechaSalida: Date): Observable<number> {
        return this.http.get(this.urlEndPoint + '/repuestos/' + `${fechaEntrada}/${fechaSalida}`).pipe(
            map((response) => response as number)
        );
    }
}