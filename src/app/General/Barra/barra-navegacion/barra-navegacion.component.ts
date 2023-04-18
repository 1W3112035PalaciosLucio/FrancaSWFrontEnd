import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  public isNavbarCollapsed = true;
  ngOnInit(): void {
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


}
