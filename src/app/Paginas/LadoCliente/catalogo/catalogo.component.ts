import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoCatalogoCard } from 'src/app/Models/Catalogo/Catalogo';
import { CatalogoService } from 'src/app/Services/Catalogo/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  lista: DtoCatalogoCard[] = [];
  nombre!: string;
  filtro: string = '';

  isNavVisible = true;

  constructor(private servicio: CatalogoService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isNavVisible = !entry.isIntersecting;
      });
    });

    const target = document.getElementById('barraNav');
    if (target) {
      observer.observe(target);
    }
    this.cargarCard();
  }

  cargarCard() {
    this.spinner.show();
    this.servicio.GetCatalogoCard().subscribe({
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
  SetData(productos_: DtoCatalogoCard[]) {
    this.lista = productos_;
  }

  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarCard();
    } else {
      this.lista = this.lista.filter((item) =>
        item.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.codigo.toString().includes(this.filtro.toLowerCase()) ||
        item.descripcion.toString().includes(this.filtro.toLowerCase())

      );
      this.SetData(this.lista);
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onClickNavLink(fragment: string) {
    this.scrollToSection(fragment);
  }
}
