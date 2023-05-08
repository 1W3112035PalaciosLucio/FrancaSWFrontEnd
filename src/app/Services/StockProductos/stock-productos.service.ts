import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMateriPrima } from 'src/app/Models/StockMateriaPrima/StockMateriaPrima';
import { StockProducto } from 'src/app/Models/StockProducto/StockProducto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockProductosService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoStockProducto(): Observable<any> {
    return this.http.get(this.urlBase + "StockProducto/GetListadoStockProducto", { headers: this.headers });
  }

  GetStockProductoById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "StockProducto/GetStockProductoById/" + id, { headers: this.headers });
  }

  GetListadoHistorialStockProductos(): Observable<any> {
    return this.http.get(this.urlBase + "HistorialStockProductos/GetListadoHistorialStockProductos", { headers: this.headers })
  }

  GetListaHistStockProductosById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "HistorialStockProductos/GetListaHistStockProductosById/" + id, { headers: this.headers })
  }

  PostStockProducto(p: StockProducto): Observable<any> {
    return this.http.post(this.urlBase + "StockProducto/PostStockProducto", p, { headers: this.headers });
  }

  PutStockProducto(mp: StockProducto): Observable<any> {
    return this.http.put(this.urlBase + "StockProducto/PutStockProducto", mp, { headers: this.headers });
  }
}
