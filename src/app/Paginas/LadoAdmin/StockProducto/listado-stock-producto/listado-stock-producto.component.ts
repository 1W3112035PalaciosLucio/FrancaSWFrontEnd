import { Component, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoListaHistorialStockProd, HisorialStockProducto } from 'src/app/Models/StockProducto/HistorialStockProducto';
import { DtoListadoStockProd, DtoStockProd } from 'src/app/Models/StockProducto/StockProducto';
import { StockProductosService } from 'src/app/Services/StockProductos/stock-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-stock-producto',
  templateUrl: './listado-stock-producto.component.html',
  styleUrls: ['./listado-stock-producto.component.css']
})
export class ListadoStockProductoComponent {
  nombre!: string;
  listado: DtoListadoStockProd[] = [];
  producto: DtoStockProd[] = [];
  filtro: string = '';

  estadoRespuesta: number;
  lista: DtoListaHistorialStockProd[] = [];
  @ViewChild('abrirModal') abrirModal: any;
  @ViewChild('cerrarModal') cerrarModal: any;

  constructor(
    private servicio: StockProductosService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarStockProd();
  }

  cargarHistorial(id: number) {
    if (!id) {
      throw new Error("El ID no puede estar vacío.");
    }
    this.spinner.show();
    this.estadoRespuesta = 0;
    this.servicio.GetListaHistStockProductosById(id).subscribe({
      next: (resultado) => {
        this.lista = resultado;

        console.log(resultado);
        this.spinner.hide();
      },
      error: (error) => {
        this.estadoRespuesta = error.status;
        if (this.estadoRespuesta === 400) {
          Swal.fire({
            title: "¡Error!",
            text: `El stock no tiene movimientos realizados!`,
            confirmButtonColor: '#1d3763'
          });
        } else {
          Swal.fire({
            title: "¡Error!",
            text: error.error,
            confirmButtonColor: '#1d3763'
          });
        }
        console.log(error.status);
        this.spinner.hide();
      }
    });
  }

  cargarStockProd() {
    this.spinner.show();
    this.servicio.GetListadoStockProducto().subscribe({
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
    this.router.navigateByUrl('/admin/modificarStockProducto/' + id);
  }

  agregar() {
    this.router.navigateByUrl('/admin/crearStockProducto');
  }

  SetData(producto_: DtoStockProd[]) {
    this.producto = producto_;
  }



  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarStockProd();
    } else {
      this.listado = this.listado.filter((item) =>
        item.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.cantidad.toString().includes(this.filtro.toLowerCase()) ||
        item.precio.toString().includes(this.filtro.toLowerCase()) ||

        item.fechaUltimaActualizacion.toString().toLowerCase().includes(this.filtro.toLowerCase())

      );
      this.SetData(this.producto);
    }
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
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'cantidad':
          return compare(a.cantidad, b.cantidad, isAsc);
        case 'precio':
          return compare(a.precio, b.precio, isAsc);
        case 'fechaUltimaActualizacion':
          return compare(a.fechaUltimaActualizacion.toString(), b.fechaUltimaActualizacion.toString(), isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}