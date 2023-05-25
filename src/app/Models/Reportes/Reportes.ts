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
export interface ReportePrecioStockMP {
    descripcion: string;
    precio: number;
    fechaUltimaActualizacion: string;
}
export interface ReporteOrdenesPendiente {
    nombre: string;
    cantidad: number;
}
export interface ReporteOrdenesPendienteMp {
    descripcion: string;
    cantidadMateriaPrima: number;
}
export interface ReporteMateriaDisponible {
    descripcion: string;
    cantidad: number;
}
export interface ReporteMPStockMinimo {
    descripcion: string;
    cantidad: number;
}