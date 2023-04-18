import { MateriaPrima } from "../MateriaPrima/MateriaPrima";
import { Proveedor } from "./Proveedor";

export class PrecioMateriaPrimaProveedor {
    idPreciosMateriaPrimaProveedor: number;
    idProveedor: number;
    nombre: string;
    apellido: string;
    telefono: number;
    nombreMateriaPrima: string;
    idMateriaPrima: number;
    precio: number;
    fechaVigenciaDesde: Date;
    fechaVigenciaHasta: Date;
}

export class DTOPrecioMateriaPrimaProveedor {
    idPreciosMateriaPrimaProveedor: number;
    idProveedor: number;
    nombre: string;
    apellido: string;
    telefono: number;
    nombreMateriaPrima: string;
    idMateriaPrima: number;
    precio: number;
    fechaVigenciaDesde: Date;
    fechaVigenciaHasta: Date;
    proveedor:Proveedor;
    materiaPrima:MateriaPrima;
}