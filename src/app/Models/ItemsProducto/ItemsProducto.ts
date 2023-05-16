export interface PrecioProd {
    idPreciosBocha: number;
    fechaVigenciaDesde: Date;
    fehcaVigenciaHasta: Date;
    precio: number;
}
export interface TipoProd {
    idTipoProducto: number;
    descripcion: string;
}
export interface MedidaProd {
    idMedidaProducto: number;
    descripcion: string;
}
export interface ColorProd {
    idColorProducto: number;
    descripcion: string;
}

export interface DisenioProd {
    idDisenio: number;
    descripcion: string;
}