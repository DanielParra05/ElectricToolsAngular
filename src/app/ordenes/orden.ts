import { Cliente } from '../clientes/cliente';

export class Orden {
  id_orden:number;
  fecha_entrada:string;
  fecha_salida:string;
  marca_articulo:string;
  modelo_articulo:string;
  nombre_articulo:string;
  problema_reportado:string;
  serial_articulo:string;
  valor:string;
  cliente:Cliente;
}
