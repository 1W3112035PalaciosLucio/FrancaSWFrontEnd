import { MateriaPrima } from "../MateriaPrima/MateriaPrima";

export class StockMateriPrima {
    idStockMateriaPrima: number;
    idMateriaPrima: number;
    cantidad: number;
    precio: number;
    stockMinimo: number;
    fechaUltimoPrecio: Date;
    fechaUltimaActualizacion: Date;
    stockInicial: number;
}

export class DtoListaStockMP {
    idStockMateriaPrima: number;
    idMateriaPrima: number;
    descripcion: string;
    cantidad: number;
    precio: number;
    stockMinimo: number;
    fechaUltimoPrecio: Date;
    fechaUltimaActualizacion: Date;
    stockInicial: number;
}

export class DtoStockMateriaPrima {
    idCatalogo: number;
    idProducto: number;
    descripcion: string;
    imagen: string;
    materiaPrima: MateriaPrima;
}

export class DTTOStockMateriPrima {
    idStockMateriaPrima: number;
    idMateriaPrima: number;
    cantidad: number;
    precio: number;
    stockMinimo: number;
    fechaUltimoPrecio: Date;
    fechaUltimaActualizacion: Date;
    stockInicial: number;
    tipoMovimiento: string;
}
