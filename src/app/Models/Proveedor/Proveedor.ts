import { Localidad } from "./Localidad";
import { Provincia } from "./Provincia";

export interface Proveedor {
    idProveedor: number;
    nombre: string;
    apellido: string;
    telefono: number;
    idLocalidad: number;
}

export interface DTOProveedor {
    idProveedor: number;
    nombre: string;
    apellido: string;
    telefono: number;
    idLocalidad: number;
    idProvincia:number;
    localidad: Localidad;
    provincia:Provincia;
}