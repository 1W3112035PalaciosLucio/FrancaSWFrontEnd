import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoReporteStockProd(): Observable<any> {
    return this.http.get(this.urlBase + "Reportes/GetListadoReporteStockProd1", { headers: this.headers });
  }
  GetListaReporteStockProd(): Observable<any> {
    return this.http.get(this.urlBase + "Reportes/GetListadoReporteStockProd", { headers: this.headers });
  }
  GetListadoReporteStockMP(): Observable<any> {
    return this.http.get(this.urlBase + "Reportes/GetListadoReporteStockMP", { headers: this.headers });
  }
}
