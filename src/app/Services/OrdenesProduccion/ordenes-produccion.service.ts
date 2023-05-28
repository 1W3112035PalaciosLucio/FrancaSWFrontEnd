import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoOrdenesProduccion, OrdenesProduccion } from 'src/app/Models/OrdenesProduccion/OrdenesProduccion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesProduccionService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoOrdenProduccion(): Observable<any> {
    return this.http.get(this.urlBase + "OrdenProduccion/GetListadoOrdenProduccion", { headers: this.headers });
  }

  PostOrdenProduccion(op: DtoOrdenesProduccion): Observable<any> {
    return this.http.post(this.urlBase + "OrdenProduccion/PostOrdenProd", op, { headers: this.headers });
  }

  PutEstadoOrden(numeroOrden: number, idEstadoOrdenProduccion: number): Observable<any> {
    const data = { numeroOrden: numeroOrden, idEstadoOrdenProduccion: idEstadoOrdenProduccion };
    return this.http.put(this.urlBase + "OrdenProduccion/PutEstado", data, { headers: this.headers });
  }

  // CARGAR DE COMBOS 
  GetNCliente(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetNCliente", { headers: this.headers });
  }
  GetACliente(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetACliente", { headers: this.headers });
  }
  GetProducto(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetProducto", { headers: this.headers });
  }
  GetUsuario(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetUsuario", { headers: this.headers });
  }
  GetEstado(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetEstado", { headers: this.headers });
  }
  GetEstado1(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetEstado1", { headers: this.headers });
  }
  GetEstado2(): Observable<any> {
    return this.http.get(this.urlBase + "AgregarOrdenProd/GetEstado2", { headers: this.headers });
  }
  GetOrdenProduccionById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "OrdenProduccion/GetOrdenProduccionById/" + id, { headers: this.headers });
  }
  
  PutOrden(orden: DtoOrdenesProduccion): Observable<any> {
    return this.http.put(this.urlBase + "OrdenProduccion/PutOrdenProd", orden, { headers: this.headers });
  }
}
