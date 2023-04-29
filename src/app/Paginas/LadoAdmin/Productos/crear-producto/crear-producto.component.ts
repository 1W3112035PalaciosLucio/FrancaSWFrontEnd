import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Color } from 'src/app/Models/Producto/ColorP';
import { Disenio } from 'src/app/Models/Producto/DiseñoP';
import { Medida } from 'src/app/Models/Producto/MedidaP';
import { Precio } from 'src/app/Models/Producto/PrecioP';
import { Producto } from 'src/app/Models/Producto/Producto';
import { Tipo } from 'src/app/Models/Producto/TipoP';
import { ProductosService } from 'src/app/Services/Productos/productos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  flag: boolean = false;
  disenio: Disenio[] = [];
  color: Color[] = [];
  medida: Medida[] = [];
  precio: Precio[] = [];
  tipo: Tipo[] = [];
  form!: FormGroup;
  producto = {} as Producto;
  codigo: number;



  constructor(private servicio: ProductosService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) {

  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required], [Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required]],
      disenio: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      medida: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarSelects();
    this.iniciarForm();
  }

  cargarSelects() {
    forkJoin({
      color: this.servicio.GetColor(),
      disenio: this.servicio.GetDisenio(),
      medida: this.servicio.GetMedida(),
      precio: this.servicio.GetPrecio(),
      tipo: this.servicio.GetTipoProducto(),
    }).subscribe({
      next: (resultado: any) => {
        this.color = resultado.color;
        this.disenio = resultado.disenio;
        this.medida = resultado.medida;
        this.precio = resultado.precio;
        this.tipo = resultado.tipo;
        this.spinner.hide();
      },
      error: (e: any) => {
        Swal.fire({
          title: "Error",
          text: e.error,
          confirmButtonColor: '#162B4E'
        });
        console.log(e.error);
        this.spinner.hide();
      }
    });
  }

  registrarProducto(f: NgForm) {
    console.log(this.producto)
    if (f.valid) {
      this.servicio.PostProducto(this.producto).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E',
          });
          this.producto = { ...this.producto, codigo: resultado.codigo };
          f.resetForm();
          this.volver();
          this.spinner.hide();
        },
        error: (e: any) => {
          Swal.fire({
            title: "Error",
            text: e.error,
            confirmButtonColor: '#162B4E'
          });
          console.log(e);
          this.spinner.hide();
        }
      });
    }
    else {
      Swal.fire({
        title: "Error",
        text: "El formulario es invalido",
        confirmButtonColor: '#162B4E'
      });
    }
  }

  Limpiar(f: NgForm) {
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoProducto")
  }

}
