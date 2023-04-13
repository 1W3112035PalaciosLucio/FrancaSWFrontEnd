import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComboBoxItem } from 'src/app/Interfaces/icomboitem';
import { DtoProducto, Producto } from 'src/app/Models/Producto/Producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetColor(): Observable<any> {
    return this.http.get(this.urlBase + "ColorProducto/GetColorProducto", { headers: this.headers });
  }

  GetDisenio(): Observable<any> {
    return this.http.get(this.urlBase + "DisenioProducto/GetDisenio", { headers: this.headers });
  }
  GetMedida(): Observable<any> {
    return this.http.get(this.urlBase + "MedidaProducto/GetMedida", { headers: this.headers });
  }
  GetPrecio(): Observable<any> {
    return this.http.get(this.urlBase + "PrecioProducto/GetPrecio", { headers: this.headers });
  }
  GetTipoProducto(): Observable<any> {
    return this.http.get(this.urlBase + "TipoProducto/GetTipoProducto", { headers: this.headers });
  }

  GetProductos(): Observable<any> {
    return this.http.get(this.urlBase + "Producto/GetProducto", { headers: this.headers });
  }
  GetListadoProductos(): Observable<any> {
    return this.http.get(this.urlBase + "Producto/GetListadoProductos", { headers: this.headers });
  }
  GetProductoById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Producto/GetProductoById/" + id, { headers: this.headers });
  }
  PostProducto(p: Producto): Observable<any> {
    return this.http.post(this.urlBase + "Producto/PostProducto", p, { headers: this.headers });
  }
  PutProducto(producto: DtoProducto): Observable<any> {
    return this.http.put(this.urlBase + "Producto/PutProducto", producto, { headers: this.headers });
  }

  DesactivarProducto(id: number): Observable<any> {
    return this.http.delete(this.urlBase + "Producto/DesactivarProducto/" + id, { headers: this.headers });
  }
  ActivarProducto(id: number): Observable<any> {
    return this.http.put(this.urlBase + "Producto/ActivarProducto/" + id, { headers: this.headers });
  }
}
