import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  selectedItem: string;
  selectedItemsPressed: boolean = false;
  selectedItemPressedClass: string;
  public isNavbarCollapsed = true;

  constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit(): void {
    //this.checkRoute();
    // this.activarSelectedItem();
    this.ch();
  }

  ch(): void {
    const currentRoute = this.router.url;
    const defaultRoute = '/cliente/inicioCliente';
    if (currentRoute !== defaultRoute) {
      this.deselectedItemPressed();
    } else {
      this.activarSelectedItem();
    }
  }

  // isActiveRoute(route: string): boolean {
  //   return this.router.url === route;
  // }

  activarSelectedItem() {
    this.selectedItem = 'home';
    this.selectedItemsPressed = true;
  }
  deselectedItemPressed() {
    this.selectedItemsPressed = false;
    this.selectedItemPressedClass = this.selectedItemsPressed ? 'selected-item-pressed' : '';
  }


  logout() {
    this.loginService.desloguearUsuario();
  }

  userHasRole(roles: string[]): boolean {
    return this.loginService.checkUseHasRole(roles);
  }

  closeNavbar() {
    if (!this.isNavbarCollapsed) {
      this.isNavbarCollapsed = true;
    }
  }




  checkRoute(): void {
    const currentRoute = this.router.url;
    const defaultRoute = '/cliente/inicioCliente';

    if (currentRoute !== defaultRoute) {
      this.router.navigateByUrl(defaultRoute);
    }
  }
}