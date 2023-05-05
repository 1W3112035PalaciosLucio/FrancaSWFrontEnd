import { MateriaPrima } from "../MateriaPrima/MateriaPrima";

export class StockMateriPrima {

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