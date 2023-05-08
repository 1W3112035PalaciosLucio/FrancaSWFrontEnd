import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Producto } from 'src/app/Models/Producto/Producto';
import { StockProducto } from 'src/app/Models/StockProducto/StockProducto';
import { ProductosService } from 'src/app/Services/Productos/productos.service';
import { StockProductosService } from 'src/app/Services/StockProductos/stock-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-stock-producto',
  templateUrl: './crear-stock-producto.component.html',
  styleUrls: ['./crear-stock-producto.component.css']
})
export class CrearStockProductoComponent implements OnInit {

  producto: Producto[] = [];
  stockProducto: StockProducto[] = [];

  stockP = {} as StockProducto;

  flag: boolean = false;



  constructor(private servicio: StockProductosService, private spinner: NgxSpinnerService,
    private router: Router, private servicioP: ProductosService) {

  }

  ngOnInit(): void {
    this.cargarSelects();
    this.cargarStockProductos();
  }

  cargarSelects() {
    this.servicioP.GetProductos().subscribe({
      next: (resultado: any) => { this.producto = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  cargarStockProductos() {
    // Llama a tu servicio para obtener la lista de stockProducto
    this.servicio.GetListadoStockProducto().subscribe({
      next: (resultado: any) => { this.stockProducto = resultado, console.log(resultado) },
      error: (e: any) => (console.log(e.error))
    })
  }





  cargarStock(f: NgForm) {
    if (f.valid) {
      // Verificar si ya existe un stock para el producto seleccionado
      const stockExistente = this.stockProducto.find(stock => stock.idProducto === this.stockP.idProducto);
      console.log(stockExistente);
      if (stockExistente) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ya hay registros de este producto en el stock',
          confirmButtonColor: '#162B4E'
        });
      } else {
        this.servicio.PostStockProducto(this.stockP).subscribe({
          next: (resultado: any) => {
            if (resultado.ok === true) {
              Swal.fire({
                icon: 'success',
                text: resultado.message,
                confirmButtonColor: '#162B4E'
              }).then(() => {
                this.router.navigateByUrl("admin/listadoStockProducto");
              });
            }
            else {
              Swal.fire({
                icon: 'warning',
                text: resultado.message,
                confirmButtonColor: '#162B4E'
              });
              f.reset();
            }
            console.log(resultado);
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se ha producido un error al cargar el stock. Por favor, inténtelo de nuevo más tarde.',
              confirmButtonColor: '#162B4E'
            });
            console.log(error);
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El formulario es inválido. Por favor, corrija los errores antes de continuar.',
        confirmButtonColor: '#162B4E'
      });
    }
  }

  volver() {
    this.router.navigateByUrl("admin/listadoStockProducto");
  }

  Limpiar(f: NgForm) {
    f.resetForm();
  }
}
 