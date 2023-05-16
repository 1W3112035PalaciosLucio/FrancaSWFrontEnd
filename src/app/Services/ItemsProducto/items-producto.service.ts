import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorProd,DisenioProd, MedidaProd, PrecioProd, TipoProd  } from 'src/app/Models/ItemsProducto/ItemsProducto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsProductoService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;


  PostColor(c: ColorProd): Observable<any> {
    return this.http.post(this.urlBase + "ColorProducto/PostColor", c, { headers: this.headers });
  }

  PostDisenio(d: DisenioProd): Observable<any> {
    return this.http.post(this.urlBase + "DisenioProducto/PostDisenio", d, { headers: this.headers });
  }

  PostMedida(m: MedidaProd): Observable<any> {
    return this.http.post(this.urlBase + "MedidaProducto/PostMedida", m, { headers: this.headers });
  }

  PostPrecio(p: PrecioProd): Observable<any> {
    return this.http.post(this.urlBase + "PrecioProducto/PostPrecio", p, { headers: this.headers });
  }

  PostTipo(t: TipoProd): Observable<any> {
    return this.http.post(this.urlBase + "TipoProducto/PostTipoProd", t, { headers: this.headers });
  }

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
    return this.http.get(this.urlBase + "PrecioProducto/GetPrecios", { headers: this.headers });
  }
  GetTipoProducto(): Observable<any> {
    return this.http.get(this.urlBase + "TipoProducto/GetTipoProducto", { headers: this.headers });
  }
}
