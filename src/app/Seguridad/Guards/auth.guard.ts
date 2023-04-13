import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loginService.usuarioLogueado()) {
      if (!this.loginService.checkCanLoad(route.data['roles'])) {
        this.displayErrors("¡Usted no tiene los permisos nececsarios para acceder a esta sección del sitio.!", "Error");
        this.router.navigateByUrl('/cliente/inicioCliente');
      }
      return true;
    }

    this.displayErrors("¡Para acceder a esta funcion debe loguearse!.", "Error");
    this.router.navigateByUrl('/seguridad/login');
    return false;
  }

  displayErrors(errorMessage: string, title: string): void {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: errorMessage,
      confirmButtonColor: '#162B4E'
    });
  }

}
