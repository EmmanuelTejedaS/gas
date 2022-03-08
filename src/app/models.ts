
export interface Cliente {
    uid: string;
    email: string;
    celular: string;
    foto: string;
    nombre: string;
    referencia: string;
    ubicacion: any;
 }

export interface Producto {
    nombre: string;
    precioNormal: number;
    precioReducido;
    foto: string;
    id: string;
    fecha: Date;
}
