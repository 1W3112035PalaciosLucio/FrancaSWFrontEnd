export interface OrdenesProduccion {
    idOrdenProduccion: number;
    nombreCliente: string;
    apellidoCliente: string;
    nombreProd: string;
    nombreUsuario: string;
    estadoOrden: string;
    fechaPedido: Date;
    fechaEntrega: Date;
    numeroOrden: number;
    cantidad: number;
}

export interface DtoOrdenesProduccion {
    idOrdenProduccion: number;
    idCliente: number;
    idProducto: number;
    idUsuario: number;
    idEstadoOrdenProduccion: number;
    fechaPedido: Date;
    fechaEntrega: Date;
    numeroOrden: number;
    cantidad: number;
}