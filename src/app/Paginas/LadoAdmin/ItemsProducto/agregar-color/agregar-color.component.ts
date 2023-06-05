import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColorProd } from 'src/app/Models/ItemsProducto/ItemsProducto';
import { ItemsProductoService } from 'src/app/Services/ItemsProducto/items-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-color',
  templateUrl: './agregar-color.component.html',
  styleUrls: ['./agregar-color.component.css']
})
export class AgregarColorComponent implements OnInit {

  color = {} as ColorProd;
  descripcion: string;
  form!: FormGroup;

  col: ColorProd[] = [];
  desc!: string;
  filtro: string = '';
  isNavVisible = true;

  constructor(private servicio: ItemsProductoService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.cargarColor();
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

  registrar(f: NgForm) {
    console.log(this.color)
    if (f.valid) {
      this.servicio.PostColor(this.color).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }), this.color = {} as ColorProd,this.volver(), f.resetForm(); this.spinner.hide();
        }, error: (e: any) => { alert(e.error); console.log(e); }
      })
    }
  }

  Limpiar(f: NgForm) {
    this.color = {} as ColorProd;
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoProducto")
  }


  SetData(col_: ColorProd[]) {
    this.col = col_
  }

  cargarColor() {
    this.spinner.show();
    this.servicio.GetColor().subscribe({
      next: (resultado) => { this.SetData(resultado); this.spinner.hide(); },
      error: (error) => { console.log(error.status); this.spinner.hide(); }
    });
  }

  FiltrarTabla() {
    this.col = this.col.filter(item => item.descripcion.includes(this.descripcion));
    this.SetData(this.col);
    this.descripcion = "";
  }

  filtrarTabla() {
    if (this.filtro.length === 0) {
      this.cargarColor();
    } else {
      this.col = this.col.filter((item) =>
        item.descripcion.toLowerCase().includes(this.filtro.toLowerCase()) 
      );
      this.SetData(this.col);
    }
  }

  sortData(sort: Sort) {
    const data = this.col.slice();
    if (!sort.active || sort.direction === '') {
      this.col = data;
      return;
    }

    this.col = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'descripcion':
          return compare(a.descripcion, b.descripcion, isAsc);

        default:
          return 0;
      }
    });
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

  nuevo(fragment: string) {
    this.scrollToSection(fragment);
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}