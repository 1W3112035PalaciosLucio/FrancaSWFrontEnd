import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOPrecioMateriaPrimaProveedor, PrecioMateriaPrimaProveedor } from 'src/app/Models/Proveedor/PreMatPProv';
import { DTOProveedor, Proveedor } from 'src/app/Models/Proveedor/Proveedor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  GetProvincia(): Observable<any> {
    return this.http.get(this.urlBase + "LocalidadProvincia/GetProvincia", { headers: this.headers });
  }

  getLocalidadesByProvincia(id: number): Observable<any> {
    return this.http.get(this.urlBase + "LocalidadProvincia/" + id + "/localidades", { headers: this.headers });
  }
  GetLocalidadesByProvincia(idProvincia: number): Observable<any> {
    const url = `${this.urlBase}LocalidadProvincia/${idProvincia}/localidades`;
    return this.http.get(url, { headers: this.headers });
  }

  GetPreciosMatPrimaProv(): Observable<any> {
    return this.http.get(this.urlBase + "PrecioMatPrimaProv/GetPreciosMateriasPrimasProveedores", { headers: this.headers });
  }

  GetPrecioMatPrimaProvById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "PrecioMatPrimaProv/GetPrecioMatPrimaProvById/" + id, { headers: this.headers });
  }

  PostProducto(p: PrecioMateriaPrimaProveedor): Observable<any> {
    return this.http.post(this.urlBase + "PrecioMatPrimaProv/PostMatPrimaProv", p, { headers: this.headers });
  }

  PutPreciosMateriasPrimasProveedore(preMatPrProv: DTOPrecioMateriaPrimaProveedor): Observable<any> {
    return this.http.put(this.urlBase + "PrecioMatPrimaProv/PutPreciosMateriasPrimasProveedores", preMatPrProv, { headers: this.headers });
  }

  PostProveedor(p: Proveedor): Observable<any> {
    return this.http.post(this.urlBase + "Proveedor/PostProveedor", p, { headers: this.headers });
  }

  GetConsultaMpByProveedor(id: number): Observable<any> {
    return this.http.get(this.urlBase + "PrecioMatPrimaProv/GetConsultaMpByProveedor/" + id, { headers: this.headers });
  }

  GetConsultaMpByMateriaPrima(id: number): Observable<any> {
    return this.http.get(this.urlBase + "PrecioMatPrimaProv/GetConsultaMpByMateriaPrima/" + id, { headers: this.headers });
  }

  GetListadoProveedor(): Observable<any> {
    return this.http.get(this.urlBase + "Proveedor/GetListadoProveedores", { headers: this.headers });
  }

  GetProveedorById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Proveedor/GetProveedorById/" + id, { headers: this.headers });
  }

  GetProveedorByIdd(id: number): Observable<any> {
    return this.http.get(this.urlBase + "Proveedor/GetProveedorByIdd/" + id, { headers: this.headers });
  }
  GetLocalidades(): Observable<any> {
    return this.http.get(this.urlBase + "LocalidadProvincia/GetLocalidades/", { headers: this.headers });
  }

  PutProveedor(proveedor: DTOProveedor): Observable<any> {
    return this.http.put(this.urlBase + "Proveedor/PutProveedor", proveedor, { headers: this.headers });
  }
}
