import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formula } from 'src/app/Models/Formula/Formula';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetListadoFormula(): Observable<any> {
    return this.http.get(this.urlBase + "Formula/GetListadoFormula", { headers: this.headers });
  }

  GetFormulaById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Formula/GetFormulaById/" + id, { headers: this.headers });
  }

  PostFormula(f: Formula): Observable<any> {
    return this.http.post(this.urlBase + "Formula/PostFormula", f, { headers: this.headers });
  }

  PutFormula(f: Formula): Observable<any> {
    return this.http.put(this.urlBase + "Formula/PutFormula", f, { headers: this.headers });
  }

  GetMatP(): Observable<any> {
    return this.http.get(this.urlBase + "MateriaPrima/GetMateriaPrima", { headers: this.headers });
  }
  
  GetProd(): Observable<any> {
    return this.http.get(this.urlBase + "Producto/GetProducto", { headers: this.headers });
  }
}
