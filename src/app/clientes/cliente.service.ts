import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

/**
Clase service para comunicarse con los datos, (estos datos son traidos desde spring)
aca debe ir toda la logica de negocio. El orden de las clases es
el nombre como tal y el sufijo de el tipo de clase. Cliente.component,
cliente.service ...etc...
El decorador @ indica el tipo de clase que es angular, cual va a sr su rol,
sus funcionalidades etc.
Injectable
*/
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Cliente[])
    );
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          //cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      })
    );
  }

  buscarCliente(campoBusqueda: string, page: number): Observable<any> {
    console.log('Se entra a busqueda ----> '+this.urlEndPoint + '/busqueda/' + campoBusqueda + '/' + page);
    return this.http.get(this.urlEndPoint + '/busqueda/' + campoBusqueda + '/' + page).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          //cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        //this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );

  }

  public delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
