import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarraService } from 'src/app/Services/Barra/barra.service';
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

  barraNavSelected: boolean = false;

  constructor(private loginService: LoginService, private router: Router,
    private barraNavService: BarraService) { 
      this.barraNavService.barraNavSelected$.subscribe(selected => {
        this.barraNavSelected = selected;
      });
    }

  ngOnInit(): void {
    const storedSelectedItem = localStorage.getItem('selectedItem');
    const storedSelectedItemsPressed = localStorage.getItem('selectedItemsPressed');
    if (storedSelectedItem && storedSelectedItemsPressed) {
      this.selectedItem = storedSelectedItem;
      this.selectedItemsPressed = storedSelectedItemsPressed === 'true';
    }

  }

  activarSelectedItem() {
    this.selectedItem = 'home';
    this.selectedItemsPressed = true;
    localStorage.setItem('selectedItem', this.selectedItem);
    localStorage.setItem('selectedItemsPressed', this.selectedItemsPressed.toString());
  }
  deselectedItemPressed() {
    this.selectedItemsPressed = false;
    localStorage.setItem('selectedItemsPressed', this.selectedItemsPressed.toString());
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