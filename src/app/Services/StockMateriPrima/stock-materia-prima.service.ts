import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTTOStockMateriPrima, StockMateriPrima } from 'src/app/Models/StockMateriaPrima/StockMateriaPrima';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockMateriaPrimaService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoStockMateriaPrima(): Observable<any> {
    return this.http.get(this.urlBase + "StockMateria/GetListadoStockMateriaPrima", { headers: this.headers });
  }
  
  GetStockMateriaPrimaById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "StockMateria/GetStockMateriaPrimaById/" + id, { headers: this.headers });
  }

  GetListadoHistorialStockMp(): Observable<any> {
    return this.http.get(this.urlBase + "HistorialStockMP/GetHistorialStockMP", { headers: this.headers })
  }

  GetListadoHistorialStockMpById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "HistorialStockMP/GetListaHistStockMPById/" + id, { headers: this.headers })
  }

  PostStockMP(mp: StockMateriPrima): Observable<any> {
    return this.http.post(this.urlBase + "StockMateria/PostStockMateriaPrima", mp, { headers: this.headers });
  }

  PutStockMp(mp: DTTOStockMateriPrima): Observable<any> {
    return this.http.put(this.urlBase + "StockMateria/PutStockMateriaPrima" ,  mp, { headers: this.headers });
  }
}
 