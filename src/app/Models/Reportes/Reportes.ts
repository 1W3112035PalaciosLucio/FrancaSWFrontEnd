export interface ReporteStockProd {
    idProducto: number;
    codigo: number;
    nombre: string;
    tipoProducto: string;
    colorProducto: string;
    medidaProducto: number;
    precioBocha: number;
    disenioProducto: string;
    cantidad: number;
    fechaUltimaActualizacion: Date;
}
export interface ReporteStockProd1 {
    nombre: string;
    cantidad: number;
}
export interface ReporteStockMP {
    descripcion: string;
    cantidad: number;
}