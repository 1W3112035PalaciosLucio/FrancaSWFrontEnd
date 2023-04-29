import { Color } from "../Producto/ColorP";
import { Disenio } from "../Producto/DiseñoP";
import { Medida } from "../Producto/MedidaP";
import { Precio } from "../Producto/PrecioP";
import { Producto } from "../Producto/Producto";
import { Tipo } from "../Producto/TipoP";

export class Catalogo {
    idCatalogo: number;
    idProducto: number;
    descripcion: string;
    imagen: File;
}

export class DtoCatalogo {
    idCatalogo: number;
    idProducto: number;
    descripcion: string;
    imagen: string;
    producto: Producto;
}

export class DtoListaCatalogo {
    idCatalogo: number;
    idProducto: number;
    descripcion: string;
    imagen: string;
    producto: Producto;
    codigo: number;
    nombre: string;
    tipoProducto: string;
    colorProducto: string;
    medidaProducto: number;
    precioBocha: number;
    disenioProducto: string;
}

export class DtoCATALOGO {
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
    activo: boolean;

    idCatalogo: number;
    descripcion: string;
    imagen: string;
    producto: Producto;
}

export interface DtoProdCat {
    idProducto: number;
    codigo: number;
}

export interface DtoCatalogoCard {
    descripcion: string;
    imagen: string;
    codigo: number;
    nombre: string;
}