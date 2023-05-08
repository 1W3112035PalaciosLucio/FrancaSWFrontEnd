export class StockProducto {
    idStockProducto: number;
    idProducto: number;
    cantidad: number;
    fechaUltimaActualizacion: Date;
    // tipoMovimiento: string;
}

export class DtoListadoStockProd {
    idStockProducto: number;
    idProducto: number;
    nombre: string;
    cantidad: number;
    precio: number;
    fechaUltimaActualizacion: Date;
}

export class DtoStockProd{
    nombre: string;
    cantidad: number;
    precio: number;
    fechaUltimaActualizacion: Date;
}

export class DtoStockProducto {
    idStockProducto: number;
    idProducto: number;
    cantidad: number;
    fechaUltimaActualizacion: Date;
    tipoMovimiento: string;
}