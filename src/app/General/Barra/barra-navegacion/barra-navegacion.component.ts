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

  constructor(private loginService: LoginService, private router: Router) { }
  public isNavbarCollapsed = true;
  ngOnInit(): void {
    this.checkRoute();
    this.activarSelectedItem();
  }

  activarSelectedItem() {
    this.selectedItem = 'home';
    this.selectedItemsPressed = true;
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

  deselectedItemPressed() {
    this.selectedItemsPressed = false;
    this.selectedItemPressedClass = this.selectedItemsPressed ? 'selected-item-pressed' : '';
  }

  checkRoute(): void {
    const currentRoute = this.router.url;
    const defaultRoute = '/cliente/inicioCliente';

    if (currentRoute !== defaultRoute) {
      this.router.navigateByUrl(defaultRoute);
    }
  }

}
