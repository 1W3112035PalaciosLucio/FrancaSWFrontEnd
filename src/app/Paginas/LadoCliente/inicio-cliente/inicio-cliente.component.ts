import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoCatalogoCard } from 'src/app/Models/Catalogo/Catalogo';
import { CatalogoService } from 'src/app/Services/Catalogo/catalogo.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css']
})
export class InicioClienteComponent implements OnInit {

  lista: DtoCatalogoCard[] = [];
  isSelected: boolean = false;


  constructor(private servicio: CatalogoService, 
    private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cargarCard();
    this.checkIfSelected();
    this.router.events.subscribe((val) => {
      // Verifica cada vez que cambia la ruta
      this.checkIfSelected();
    });
  }

  checkIfSelected() {
    const currentUrl = this.router.url;
    const selectedUrls = ['/cliente/terminos', '/cliente/ayuda'];
    this.isSelected = selectedUrls.includes(currentUrl);
  }

  public cargarCard() {
    this.spinner.show();
    this.servicio.GetCatalogoCardRandom().subscribe({
      next: (resultado) => {
        this.lista = resultado;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error.status);
        this.spinner.hide();
      },
    });
  }

 

}
