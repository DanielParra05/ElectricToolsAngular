import { Cliente } from '../clientes/cliente';

export class Orden {
  idOrden: number;
  fechaEntrada: string;
  fechSalida: string;
  marcaArticulo: string;
  modeloArticulo: string;
  nombreArticulo: string;
  problemaReportado: string;
  serialArticulo: string;
  valor: string;
  cliente: Cliente;
  clienteId: number;
}
