import { Cliente } from '../clientes/cliente';

export class Orden {
  idOrden: number;
  fechaEntrada: Date;
  fechSalida: Date;
  marcaArticulo: string;
  modeloArticulo: string;
  nombreArticulo: string;
  problemaReportado: string;
  serialArticulo: string;
  valor: number;
  cliente: Cliente;
}
