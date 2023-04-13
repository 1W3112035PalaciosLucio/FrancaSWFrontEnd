export interface Login {
    email: string;
    password: string;
    roles: string[];
    token: string;
    activo: boolean;
    nombre: string;
    apellido: string;
    message: string;
    ok: boolean;
    error: string;
    stateCode: number;
}