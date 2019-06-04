import { Cliente } from '../clientes/cliente';

export class Orden {
  id: number;
  fechaEntrada: string;
  fechSalida: string;
  observaciones: string;
  cliente: Cliente;
  nombreArticulo: string;
  marcaArticulo: string;
  modeloArticulo: string;
  serialArticulo: string;
  problemaReportado: string;
  estado: string;
  valorArreglo: number;
  valorRepuestos: number;
}
