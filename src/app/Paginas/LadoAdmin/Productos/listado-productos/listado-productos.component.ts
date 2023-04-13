import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, pipe } from 'rxjs';
import { Color } from 'src/app/Models/Producto/ColorP';
import { Disenio } from 'src/app/Models/Producto/DiseñoP';
import { DtoLista } from 'src/app/Models/Producto/DtoLista';
import { Medida } from 'src/app/Models/Producto/MedidaP';
import { Precio } from 'src/app/Models/Producto/PrecioP';
import { DtoProducto, Producto } from 'src/app/Models/Producto/Producto';
import { Tipo } from 'src/app/Models/Producto/TipoP';
import { ProductosService } from 'src/app/Services/Productos/productos.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
})


export class ListadoProductosComponent implements OnInit {
  constructor(
    private servicio: ProductosService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  productos: DtoProducto[] = [];

  nombre!: string;
  colores: Color[] = [];
  listado: DtoLista[] = [];

  filtro: string = '';

  
  ngOnInit(): void {
    this.cargarProductos();
  }

  SetData(productos_: DtoProducto[]) {
    this.productos = productos_;
  }

  FiltrarTabla() {
    this.productos = this.productos.filter((item) =>
      item.nombre.includes(this.nombre), console.log(this.productos)
    );
    this.SetData(this.productos);
    this.nombre = '';
  }


  cargarProductos() {
    this.spinner.show();
    this.servicio.GetListadoProductos().subscribe({
      next: (resultado) => {

        this.listado = resultado;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error.status);
        this.spinner.hide();
      },
    });
  }

  Modificar(id: number) {
    this.router.navigateByUrl('/admin/modificarProducto/' + id);
  }

  agregar() {
    this.router.navigateByUrl('/admin/crearProducto');
  }

  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarProductos();
    } else {
      this.listado = this.listado.filter((item) =>
        item.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.codigo.toString().includes(this.filtro.toLowerCase()) ||
        item.colorProducto.toString().includes(this.filtro.toLowerCase()) ||
        item.tipoProducto.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.disenioProducto.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.precioBocha.toString().toLowerCase().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.productos);
    }
  }

  Desactivar(id: number) {
    Swal.fire({
      title: '¿Deseas desactivar este producto?',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: 'Si',
      cancelButtonColor: "#dc3545",
      confirmButtonColor: "#1d3763",
      icon: "warning",
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.DesactivarProducto(id).subscribe({
          next: (resultado) => {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E'
            }),
              this.cargarProductos()
          },
          error: (error) => {
            Swal.fire({
              title: "¡Error!",
              text: error.error,
              confirmButtonColor: '#1d3763'
            });
            console.log(error);
          }
        })
      } else if (result.isDenied) {

      }
    })
  }

  Activar(id: number) {
    Swal.fire({
      title: '¿Deseas activar este producto?',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: 'Si',
      cancelButtonColor: "#dc3545",
      confirmButtonColor: "#1d3763",
      icon: "warning",
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.ActivarProducto(id).subscribe({
          next: (resultado) => {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E'
            }), this.cargarProductos()
          },
          error: (error) => {
            Swal.fire({
              title: "¡Error!",
              text: error.error,
              confirmButtonColor: '#1d3763'
            });
            console.log(error);
          }
        })
      } else if (result.isDenied) {
      }
    })
  }


  sortData(sort: Sort) {
    const data = this.listado.slice();
    if (!sort.active || sort.direction === '') {
      this.listado = data;
      return;
    }

    this.listado = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'codigo':
          return compare(a.codigo, b.codigo, isAsc);
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'colorProducto':
          return compare(a.colorProducto, b.colorProducto, isAsc);
        case 'disenioProducto':
          return compare(a.disenioProducto, b.disenioProducto, isAsc);
        case 'medidaProducto':
          return compare(a.medidaProducto, b.medidaProducto, isAsc);
        case 'tipoProducto':
          return compare(a.tipoProducto, b.tipoProducto, isAsc);
        case 'precioBocha':
          return compare(a.precioBocha, b.precioBocha, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
