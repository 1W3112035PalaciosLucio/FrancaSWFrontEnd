export interface nomCliente {
    idCliente: number;
    nombre: string;
    apellido:string;
}

export interface apeCliente {
    idCliente: number;
    apellido: string;
}

export interface nomProd {
    idProducto: number;
    nombre: string;
}

export interface nomUsuario {
    idUsuario: number;
    nombre: string;
}

export interface estado {
    idEstadoOrdenProduccion: number;
    descripcion: string;
}