import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Catalogo, DtoCatalogo } from 'src/app/Models/Catalogo/Catalogo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoCatalogo(): Observable<any> {
    return this.http.get(this.urlBase + "Catalogo/GetListadoCatalogo", { headers: this.headers });
  }

  GetCatalogoById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Catalogo/GetCatalogoById/" + id, { headers: this.headers });
  }

  GetCatalogoComboId(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Catalogo/GetListadoCatalogoProdd/" + id, { headers: this.headers });
  }

  PostCatalogo(c: any): Observable<any> {
    let headerss = new HttpHeaders();
    console.log(c);
    headerss.append('Content-Type', 'multipart/form-data');
    headerss.append('Accept', 'application/json');
    return this.http.post(this.urlBase + "Catalogo/PostCatalogo", c, { headers: headerss });
  }

  PutCatalogo(c: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.put(this.urlBase + "Catalogo/PutCatalogo", c, { headers: headers });
  }

  GetProductos(): Observable<any> {
    return this.http.get(this.urlBase + "Producto/GetProducto", { headers: this.headers });
  }

  GetProductoById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Producto/GetProductoById/" + id, { headers: this.headers });
  }
  
  GetCatalogoId(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Catalogo/GetListaCatalogoProdById/" + id, { headers: this.headers });
  }

  GetCatalogoCard(): Observable<any> {
    return this.http.get(this.urlBase + "Catalogo/GetCatalogoCard", { headers: this.headers });
  }

  EliminarCatalogo(id: number): Observable<any> {
    return this.http.delete(this.urlBase + "Catalogo/EliminarCatalogo/" + id, { headers: this.headers });
  }
  
  GetCatalogoCardRandom(): Observable<any> {
    return this.http.get<any>(this.urlBase + "Catalogo/GetCatalogoCard", { headers: this.headers }).pipe(
      map((resultado) => {
        resultado.sort(() => Math.random() - 0.5); // Mezcla aleatoriamente el arreglo
        return resultado.slice(0, 3); // Devuelve solo los primeros 3 elementos aleatorios
      })
    );
  }
}
