import { Component, OnInit } from '@angular/core';
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

  constructor(private servicio: CatalogoService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cargarCard();
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
