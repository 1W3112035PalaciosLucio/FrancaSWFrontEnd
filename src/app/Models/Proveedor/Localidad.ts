import { Provincia } from "./Provincia";

export interface Localidad {
    idLocalidad: number;
    idProvincia: number;
    descripcion: string;
}

export interface DTOLocalidad {
    idLocalidad: number;
    idProvincia: number;
    descripcion: string;
    provincia: Provincia;
}