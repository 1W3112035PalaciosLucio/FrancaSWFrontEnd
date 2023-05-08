import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Producto } from 'src/app/Models/Producto/Producto';
import { DtoStockProducto, StockProducto } from 'src/app/Models/StockProducto/StockProducto';
import { ProductosService } from 'src/app/Services/Productos/productos.service';
import { StockProductosService } from 'src/app/Services/StockProductos/stock-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-stock-producto',
  templateUrl: './modificar-stock-producto.component.html',
  styleUrls: ['./modificar-stock-producto.component.css']
})
export class ModificarStockProductoComponent implements OnInit {


  producto: Producto[] = [];
  stockProducto: StockProducto[] = [];

  stockP = {} as DtoStockProducto;

  flag: boolean = false;
  codigo: number;


  constructor(private servicio: StockProductosService, private spinner: NgxSpinnerService,
    private router: Router, private servicioP: ProductosService, private params: ActivatedRoute) {
    this.codigo = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.obtenerStock(this.codigo);
  }


  obtenerStock(id: number) {
    this.servicio.GetStockProductoById(id).subscribe({
      next: (data) => {
        this.stockP = data,
          console.log(this.stockP),
          this.cargarSelects()
      },
      error: (error) => { console.log(error) }
    })
  }

  cargarSelects() {
    this.servicioP.GetProductos().subscribe({
      next: (resultado: any) => { this.producto = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  actualizarStock(f: NgForm) {
    if (f.valid) {
      this.servicio.PutStockProducto(this.stockP).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'El stock se ha actualizado correctamente',
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoStockProducto");
          });
          console.log(resultado);
          console.log(f);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al actualizar el stock. Por favor, inténtelo de nuevo más tarde.',
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
  }


  volver() {
    this.router.navigateByUrl("admin/listadoStockProducto");
  }

  Limpiar(f: NgForm) {
    f.resetForm();
  }

}
