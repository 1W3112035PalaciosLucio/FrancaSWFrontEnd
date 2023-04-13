import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Color } from 'src/app/Models/Producto/ColorP';
import { Disenio } from 'src/app/Models/Producto/DiseñoP';
import { Medida } from 'src/app/Models/Producto/MedidaP';
import { Precio } from 'src/app/Models/Producto/PrecioP';
import { Producto } from 'src/app/Models/Producto/Producto';
import { Tipo } from 'src/app/Models/Producto/TipoP';
import { ProductosService } from 'src/app/Services/Productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  disenio: Disenio[] = [];
  color: Color[] = [];
  medida: Medida[] = [];
  precio: Precio[] = [];
  tipo: Tipo[] = [];
  form!: FormGroup;
  producto = {} as Producto;
  codigo: number;
  flag: boolean = false;

  constructor(private servicio: ProductosService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private params: ActivatedRoute, private router: Router) {
    this.codigo = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.obtenerProducto(this.codigo)
  }

  obtenerProducto(id: number) {
    this.servicio.GetProductoById(id).subscribe({
      next: (data) => { this.producto = data, console.log(this.producto), this.cargarSelects() },
      error: (error) => { console.log(error) }
    })
  }

  actualizarProducto(f: NgForm) {

    if (f.valid) {
      this.servicio.PutProducto(this.producto).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'El producto se ha actualizado correctamente',
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoProducto");
          });
          console.log(resultado);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al actualizar el producto. Por favor, inténtelo de nuevo más tarde.',
            confirmButtonColor: '#162B4E'
          });
          console.log(error);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El formulario es inválido. Por favor, corrija los errores antes de continuar.',
        confirmButtonColor: '#162B4E'
      });
    }
    // if (f.valid) {
    //   this.servicio.PutProducto(this.producto).subscribe({
    //     next: (resultado: any) => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Se actualizo un producto',
    //         confirmButtonColor: '#162B4E'

    //       }), this.router.navigateByUrl("admin/listadoProducto")
    //     },
    //     error: (e: any) => {
    //       Swal.fire({
    //         title: "Error",
    //         text: e.error,
    //         confirmButtonColor: '#162B4E'
    //       }); console.log(e.error)
    //     }
    //   })
    // }
    // else {
    //   Swal.fire({
    //     title: "Error",
    //     text:"El formulario es invalido",
    //     confirmButtonColor: '#162B4E'
    // })
    // }
  }

  cargarSelects() {
    this.servicio.GetColor().subscribe({
      next: (resultado: any) => { this.color = resultado },
      error: (e: any) => (console.log(e.error))
    })
    this.servicio.GetDisenio().subscribe({
      next: (resultado: any) => { this.disenio = resultado },
      error: (e: any) => (console.log(e.error))
    })
    this.servicio.GetMedida().subscribe({
      next: (resultado: any) => { this.medida = resultado },
      error: (e: any) => (console.log(e.error))
    })
    this.servicio.GetPrecio().subscribe({
      next: (resultado: any) => { this.precio = resultado, console.log(resultado) },
      error: (e: any) => (console.log(e.error))

    })
    this.servicio.GetTipoProducto().subscribe({
      next: (resultado: any) => { this.tipo = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  volver() {
    this.router.navigateByUrl("admin/listadoProducto");
  }

}
