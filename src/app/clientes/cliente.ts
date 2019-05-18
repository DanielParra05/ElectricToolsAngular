import { Orden } from '../ordenes/orden';

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    ordenes: Orden;
    cedula: string;
    telefono: string;
}
