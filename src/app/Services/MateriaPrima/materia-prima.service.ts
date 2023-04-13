import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  headers = new HttpHeaders({
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetMateriaPrima(): Observable<any> {
    return this.http.get(this.urlBase + "MateriaPrima/GetMateriaPrima", { headers: this.headers });
  }

  GetMateriaPrimaById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "MateriaPrima/GetMateriaPrimaById/" + id, { headers: this.headers });
  }

  PostMateriaPrima(mp: MateriaPrima): Observable<any> {
    return this.http.post(this.urlBase + "MateriaPrima/PostMateriaPrima", mp, { headers: this.headers });
  }

  PutMateriaPrima(mp: MateriaPrima): Observable<any> {
    return this.http.put(this.urlBase + "MateriaPrima/PutMateriaPrima", mp, { headers: this.headers });
  }

}
