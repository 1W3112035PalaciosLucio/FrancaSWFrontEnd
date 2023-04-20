import { Localidad } from "../Proveedor/Localidad";
import { Provincia } from "../Proveedor/Provincia";

export class Cliente {
    idCliente: number;
    nombre: string;
    apellido: string;
    telefono: number;
    direccion: string;
    idLocalidad: number;
}

export class DtoCliente {
    idCliente: number;
    nombre: string;
    apellido: string;
    telefono: number;
    direccion: string;
    idLocalidad: number;
    idProvincia:number;
    localidad: Localidad;
    provincia:Provincia;
}