import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { DTOPrecioMateriaPrimaProveedor } from 'src/app/Models/Proveedor/PreMatPProv';
import { DTTOStockMateriPrima, StockMateriPrima } from 'src/app/Models/StockMateriaPrima/StockMateriaPrima';
import { MateriaPrimaService } from 'src/app/Services/MateriaPrima/materia-prima.service';
import { StockMateriaPrimaService } from 'src/app/Services/StockMateriPrima/stock-materia-prima.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-stock-materia-prima',
  templateUrl: './modificar-stock-materia-prima.component.html',
  styleUrls: ['./modificar-stock-materia-prima.component.css']
})
export class ModificarStockMateriaPrimaComponent implements OnInit {
  materiaPrima: MateriaPrima[] = [];
  stockMateriaPrima: StockMateriPrima[] = [];

  stockMP = {} as DTTOStockMateriPrima;

  provPrecio = {} as DTOPrecioMateriaPrimaProveedor;
  flag: boolean = false;
  codigo: number;


  constructor(private servicio: StockMateriaPrimaService, private spinner: NgxSpinnerService,
    private router: Router, private servicioMp: MateriaPrimaService, private params: ActivatedRoute,
    private datePipe: DatePipe) {
    this.codigo = this.params.snapshot.params["id"];

  }

  ngOnInit(): void {
    this.obtenerStock(this.codigo);
  }

  obtenerStock(id: number) {
    this.servicio.GetStockMateriaPrimaById(id).subscribe({
      next: (data) => {
        this.stockMP = data,     
        console.log(this.stockMP),
        this.cargarSelects()
      },
      error: (error) => { console.log(error) }
    })
  }

  cargarSelects() {
    this.servicioMp.GetMateriaPrima().subscribe({
      next: (resultado: any) => { this.materiaPrima = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  actualizarStock(f: NgForm) {
    if (f.valid) {
      this.servicio.PutStockMp(this.stockMP).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'El stock se ha actualizado correctamente',
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoStockMateriaPrima");
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
    this.router.navigateByUrl("admin/listadoStockMateriaPrima");
  }

  Limpiar(f: NgForm) {
    f.resetForm();
  }
}
