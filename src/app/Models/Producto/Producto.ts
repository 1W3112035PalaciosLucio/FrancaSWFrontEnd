import { Color } from "./ColorP";
import { Disenio } from "./DiseñoP";
import { Medida } from "./MedidaP";
import { Precio } from "./PrecioP";
import { Tipo } from "./TipoP";

export interface Producto {
    idProducto: number;
    codigo: number;
    idTipoProducto?: number;
    idColorProducto?: number;
    idMedidaProducto?: number;
    idPreciosBocha?: number;
    idDisenioProducto?: number;
    nombre: string;
    tipo: Tipo;
    medida: Medida;
    color: Color;
    precio: Precio;
    disenio: Disenio;
    activo:boolean;
}

export interface DtoProducto {
    idProducto: number;
    codigo: number;
    idTipoProducto?: number;
    idColorProducto?: number;
    idMedidaProducto?: number;
    idPreciosBocha?: number;
    idDisenioProducto?: number;
    nombre: string;
    tipo?: Tipo;
    medida?: Medida;
    color?: Color;
    precio?: Precio;
    disenio?: Disenio;
    activo:boolean;
}