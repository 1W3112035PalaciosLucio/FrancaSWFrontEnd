export interface HistorialStockMp {
    idHistorial: number;
    idMateriaPrima: number;
    descripcion: string;
    cantidad: number;
    precio: number;
    fechaUltimaActualizacion: Date;
    tipoMovimiento: string;
}

export interface DtoHistorialStockMp {
    idStockMateriaPrima: number;
    idMateriaPrima: number;
    cantidad: number;
    precio: number;
    stockMinimo: number;
    fechaUltimoPrecio: Date;
    fechaUltimaActualizacion: Date;
    stockInicial: number;
}