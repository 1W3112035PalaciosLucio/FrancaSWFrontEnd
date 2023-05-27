import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../Models/Seguridad/Login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.baseApiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: Login | null;

  constructor(private http: HttpClient, private route: Router) { }

  usuarioLogueado(): boolean {
    const token = localStorage.getItem('token'); //?? undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  postLogin(dto: Login) {
    return this.http.post(`${this.url}Login/PostLogin`, dto).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user;
        }
      })
    );
  }

  desloguearUsuario() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.route.navigateByUrl('/seguridad/login');
  }

  checkUseHasRole(roles: string[]): boolean {
    let json = localStorage.getItem('user');
    let object = json != null ? JSON.parse(json) : null;
    this.currentUser = object;
    return (this.currentUser?.roles?.some(r => roles.indexOf(r) >= 0) ?? false) && this.usuarioLogueado();
  }

  checkCanLoad(roles: string[]): boolean {
    let json = localStorage.getItem('user');
    let object = json != null ? JSON.parse(json) : null;
    this.currentUser = object;
    console.log(this.currentUser);
    return (this.currentUser?.roles?.some(r => roles.indexOf(r) >= 0) ?? false);
  }

  getUserIdFromLocalStorage(): number {
    let json = localStorage.getItem('user');
    let object = json != null ? JSON.parse(json) : null;
    return object.idUsuario;
  }

}
