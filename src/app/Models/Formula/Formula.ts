export interface Formula {
    idFormula: number;
    idProducto: number;
    idMateriaPrima: number;
    cantidadMateriaPrima: number;
}

export interface DtoForm {
    idFormula: number;
    nombreProd: string;
    nombreMatP: string;
    cantidadMateriaPrima: number;
}

export interface MatPr {
    idMateriaPrima: number;
    codigo: number;
    descripcion: string;
}

export interface Prod {
    idProducto: number;
    codigo: number;
    nombre: string;
}