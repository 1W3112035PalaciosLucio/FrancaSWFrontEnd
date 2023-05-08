export interface HisorialStockProducto{
    idHistorialProd: number
    cantidad: number;
    fechaUltimaActualizacion: Date;
    idProducto: number;
    tipoMovimiento: string;
}

export interface DtoListaHistorialStockProd{
    idHistorialProd: number
    cantidad: number;
    fechaUltimaActualizacion: Date;
    idProducto: number;
    tipoMovimiento: string;
    nombre:string;
}