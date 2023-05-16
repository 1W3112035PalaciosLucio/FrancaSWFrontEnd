import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrecioProd } from 'src/app/Models/ItemsProducto/ItemsProducto';
import { ItemsProductoService } from 'src/app/Services/ItemsProducto/items-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-precio',
  templateUrl: './agregar-precio.component.html',
  styleUrls: ['./agregar-precio.component.css']
})
export class AgregarPrecioComponent implements OnInit {
  pprecio = {} as PrecioProd;
  form!: FormGroup;

  pre: PrecioProd[] = [];
  desc!: string;
  filtro: string = '';

  constructor(private servicio: ItemsProductoService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPrecio();
  }

  registrar(f: NgForm) {
    console.log(this.pprecio)
    if (f.valid) {
      this.servicio.PostPrecio(this.pprecio).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }), this.pprecio = {} as PrecioProd, this.volver(), f.resetForm(); this.spinner.hide();
        }, error: (e: any) => { alert(e.error); console.log(e); }
      })
    }
  }

  Limpiar(f: NgForm) {
    this.pprecio = {} as PrecioProd;
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoProducto")
  }


  SetData(pre_: PrecioProd[]) {
    this.pre = pre_
  }

  cargarPrecio() {
    this.spinner.show();
    this.servicio.GetPrecio().subscribe({
      next: (resultado) => { this.SetData(resultado); this.spinner.hide(); },
      error: (error) => { console.log(error.status); this.spinner.hide(); }
    });
  }

  filtrarTabla() {
    if (this.filtro.length === 0) {
      this.cargarPrecio();
    } else {
      this.pre = this.pre.filter((item) =>
        item.precio.toString().includes(this.filtro.toLowerCase()) ||
        item.fechaVigenciaDesde.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.fehcaVigenciaHasta.toString().toLowerCase().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.pre);
    }
  }

  sortData(sort: Sort) {
    const data = this.pre.slice();
    if (!sort.active || sort.direction === '') {
      this.pre = data;
      return;
    }

    this.pre = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'precio':
          return compare(a.precio, b.precio, isAsc);
        case 'fechaVigenciaDesde':
          return compare(a.fechaVigenciaDesde.toString(), b.fechaVigenciaDesde.toString(), isAsc);
        case 'fehcaVigenciaHasta':
          return compare(a.fehcaVigenciaHasta.toString(), b.fehcaVigenciaHasta.toString(), isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
