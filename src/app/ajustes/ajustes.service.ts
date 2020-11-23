import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Ajustes } from './ajustes';

@Injectable({
  providedIn: 'root'
})

export class AjusteService {
  private urlEndPoint = 'http://localhost:8080/api/ajustes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

  getAjustes(): Observable<Ajustes> {
    return this.http.get<Ajustes>(`${this.urlEndPoint}`).pipe(
      catchError(e => {
        this.router.navigate(['/ajustes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(ajustes: Ajustes): Observable<Ajustes> {
    return this.http.post(this.urlEndPoint, ajustes, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.ajustes as Ajustes),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al almacenar ajustes', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}