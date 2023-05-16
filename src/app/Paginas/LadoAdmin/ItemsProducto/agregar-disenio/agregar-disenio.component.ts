import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisenioProd } from 'src/app/Models/ItemsProducto/ItemsProducto';
import { ItemsProductoService } from 'src/app/Services/ItemsProducto/items-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-disenio',
  templateUrl: './agregar-disenio.component.html',
  styleUrls: ['./agregar-disenio.component.css']
})
export class AgregarDisenioComponent implements OnInit {
  disenio = {} as DisenioProd;
  descripcion: string;
  form!: FormGroup;

  dis: DisenioProd[] = [];
  desc!: string;
  filtro: string = '';

  constructor(private servicio: ItemsProductoService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDisenio();
  }

  registrar(f: NgForm) {
    console.log(this.disenio)
    if (f.valid) {
      this.servicio.PostDisenio(this.disenio).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }), this.disenio = {} as DisenioProd, this.volver(),f.resetForm(); this.spinner.hide();
        }, error: (e: any) => { alert(e.error); console.log(e); }
      })
    }
  }

  Limpiar(f: NgForm) {
    this.disenio = {} as DisenioProd;
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoProducto")
  }


  SetData(dis_: DisenioProd[]) {
    this.dis = dis_
  }

  cargarDisenio() {
    this.spinner.show();
    this.servicio.GetDisenio().subscribe({
      next: (resultado) => { this.SetData(resultado); this.spinner.hide(); },
      error: (error) => { console.log(error.status); this.spinner.hide(); }
    });
  }

  filtrarTabla() {
    if (this.filtro.length === 0) {
      this.cargarDisenio();
    } else {
      this.dis = this.dis.filter((item) =>
        item.descripcion.toLowerCase().includes(this.filtro.toLowerCase()) 
      );
      this.SetData(this.dis);
    }
  }

  sortData(sort: Sort) {
    const data = this.dis.slice();
    if (!sort.active || sort.direction === '') {
      this.dis = data;
      return;
    }

    this.dis = data.sort((a, b) => {
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