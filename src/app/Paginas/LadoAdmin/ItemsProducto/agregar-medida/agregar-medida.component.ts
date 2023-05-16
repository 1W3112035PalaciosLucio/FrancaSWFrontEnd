import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedidaProd } from 'src/app/Models/ItemsProducto/ItemsProducto';
import { ItemsProductoService } from 'src/app/Services/ItemsProducto/items-producto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-medida',
  templateUrl: './agregar-medida.component.html',
  styleUrls: ['./agregar-medida.component.css']
})
export class AgregarMedidaComponent implements OnInit {
  medida = {} as MedidaProd;
  descripcion: string;
  form!: FormGroup;

  med: MedidaProd[] = [];
  desc!: string;
  filtro: string = '';

  constructor(private servicio: ItemsProductoService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMedida();
  }

  registrar(f: NgForm) {
    console.log(this.medida)
    if (f.valid) {
      this.servicio.PostMedida(this.medida).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }), this.medida = {} as MedidaProd, this.volver(), f.resetForm(); this.spinner.hide();
        }, error: (e: any) => { alert(e.error); console.log(e); }
      })
    }
  }

  Limpiar(f: NgForm) {
    this.medida = {} as MedidaProd;
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoProducto")
  }


  SetData(med_: MedidaProd[]) {
    this.med = med_
  }

  cargarMedida() {
    this.spinner.show();
    this.servicio.GetMedida().subscribe({
      next: (resultado) => { this.SetData(resultado); this.spinner.hide(); },
      error: (error) => { console.log(error.status); this.spinner.hide(); }
    });
  }

  filtrarTabla() {
    if (this.filtro.length === 0) {
      this.cargarMedida();
    } else {
      this.med = this.med.filter((item) =>
        item.descripcion.toLowerCase().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.med);
    }
  }

  sortData(sort: Sort) {
    const data = this.med.slice();
    if (!sort.active || sort.direction === '') {
      this.med = data;
      return;
    }

    this.med = data.sort((a, b) => {
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
