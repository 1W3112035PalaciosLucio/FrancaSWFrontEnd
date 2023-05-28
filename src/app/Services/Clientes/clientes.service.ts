import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, DtoCliente } from 'src/app/Models/Cliente/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoCliente(): Observable<any> {
    return this.http.get(this.urlBase + "Cliente/GetListadoCliente", { headers: this.headers });
  }

  GetProvincia(): Observable<any> {
    return this.http.get(this.urlBase + "LocalidadProvincia/GetProvincia", { headers: this.headers });
  }

  GetLocalidadesByProvincia(idProvincia: number): Observable<any> {
    const url = `${this.urlBase}LocalidadProvincia/${idProvincia}/localidades`;
    return this.http.get(url, { headers: this.headers });
  }

  GetClienteById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Cliente/GetClienteById/" + id, { headers: this.headers });
  }

  PostCliente(c: Cliente): Observable<any> {
    return this.http.post(this.urlBase + "Cliente/PostCliente", c, { headers: this.headers });
  }

  PutProveedor(cliente: DtoCliente): Observable<any> {
    return this.http.put(this.urlBase + "Cliente/PutCliente", cliente, { headers: this.headers });
  }
}
