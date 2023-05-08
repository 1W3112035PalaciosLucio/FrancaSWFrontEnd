import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { DTOPrecioMateriaPrimaProveedor } from 'src/app/Models/Proveedor/PreMatPProv';
import { StockMateriPrima } from 'src/app/Models/StockMateriaPrima/StockMateriaPrima';
import { MateriaPrimaService } from 'src/app/Services/MateriaPrima/materia-prima.service';
import { StockMateriaPrimaService } from 'src/app/Services/StockMateriPrima/stock-materia-prima.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-stock-materia-prima',
  templateUrl: './crear-stock-materia-prima.component.html',
  styleUrls: ['./crear-stock-materia-prima.component.css']
})
export class CrearStockMateriaPrimaComponent implements OnInit {

  materiaPrima: MateriaPrima[] = [];
  stockMateriaPrima: StockMateriPrima[] = [];

  stockMP = {} as StockMateriPrima;

  provPrecio = {} as DTOPrecioMateriaPrimaProveedor;
  flag: boolean = false;



  constructor(private servicio: StockMateriaPrimaService, private spinner: NgxSpinnerService,
    private router: Router, private servicioMp: MateriaPrimaService) {

  }

  ngOnInit(): void {
    this.cargarSelects();
  }


  cargarSelects() {
    this.servicioMp.GetMateriaPrima().subscribe({
      next: (resultado: any) => { this.materiaPrima = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  cargarStock(f: NgForm) {
    if (f.valid) {
      this.servicio.PostStockMP(this.stockMP).subscribe({
        next: (resultado: any) => {
          if (resultado.ok === true) {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E'
            }).then(() => {
              this.router.navigateByUrl("admin/listadoStockMateriaPrima");
            })
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
