import { Injectable } from '@angular/core';
import { Orden } from './orden';
import { of, Observable, throwError } from 'rxjs';
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



  constructor() { }
}
