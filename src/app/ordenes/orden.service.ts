import { Injectable } from '@angular/core';
import { Orden } from './orden';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

/**
 * Clase service para comunicarse con el backend
 *
 */

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private urlEndPoint = 'http://localhost:8080/api/ordenes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getOrdenes(): Observable<Orden[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Orden[])
    );
  }

  create(orden: Orden): Observable<Orden> {
    return this.http.post(this.urlEndPoint, orden, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.orden as Orden),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al crear la orden', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getOrden(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/ordenes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public update(orden: Orden): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${orden.id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        this.router.navigate(['/ordenes']);
        console.error(e.error.mensaje);
        swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  public delete(id: number): Observable<Orden> {
    return this.http.delete<Orden>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        this.router.navigate(['/ordenes']);
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
