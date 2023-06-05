import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoProd } from 'src/app/Models/ItemsProducto/ItemsProducto';
import { ItemsProductoService } from 'src/app/Services/ItemsProducto/items-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo',
  templateUrl: './agregar-tipo.component.html',
  styleUrls: ['./agregar-tipo.component.css']
})
export class AgregarTipoComponent implements OnInit {
  tipo = {} as TipoProd;
  descripcion: string;
  form!: FormGroup;

  tip: TipoProd[] = [];
  desc!: string;
  filtro: string = '';

  isNavVisible = true;

  constructor(private servicio: ItemsProductoService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.cargarTipo();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isNavVisible = !entry.isIntersecting;
      });
    });

    const target = document.getElementById('barraNav');
    if (target) {
      observer.observe(target);
    }

  }

  nuevo(fragment: string) {
    this.scrollToSection(fragment);
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

  registrar(f: NgForm) {
    console.log(this.tipo)
    if (f.valid) {
      this.servicio.PostTipo(this.tipo).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }), this.tipo = {} as TipoProd, this.volver(), f.resetForm(); this.spinner.hide();
        }, error: (e: any) => { alert(e.error); console.log(e); }
      })
    }
  }

  Limpiar(f: NgForm) {
    this.tipo = {} as TipoProd;
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoProducto")
  }


  SetData(tip_: TipoProd[]) {
    this.tip = tip_
  }

  cargarTipo() {
    this.spinner.show();
    this.servicio.GetTipoProducto().subscribe({
      next: (resultado) => { this.SetData(resultado); this.spinner.hide(); },
      error: (error) => { console.log(error.status); this.spinner.hide(); }
    });
  }

  filtrarTabla() {
    if (this.filtro.length === 0) {
      this.cargarTipo();
    } else {
      this.tip = this.tip.filter((item) =>
        item.descripcion.toLowerCase().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.tip);
    }
  }

  sortData(sort: Sort) {
    const data = this.tip.slice();
    if (!sort.active || sort.direction === '') {
      this.tip = data;
      return;
    }

    this.tip = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'descripcion':
          return compare(a.descripcion, b.descripcion, isAsc);

        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
