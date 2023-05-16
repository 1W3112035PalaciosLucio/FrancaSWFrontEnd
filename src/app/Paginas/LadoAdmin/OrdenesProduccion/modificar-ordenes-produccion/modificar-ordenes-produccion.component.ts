import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { nomCliente, apeCliente, nomProd, nomUsuario, estado } from 'src/app/Models/OrdenesProduccion/Combos/CombosOrdenProd';
import { DtoOrdenesProduccion, OrdenesProduccion } from 'src/app/Models/OrdenesProduccion/OrdenesProduccion';
import { OrdenesProduccionService } from 'src/app/Services/OrdenesProduccion/ordenes-produccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-ordenes-produccion',
  templateUrl: './modificar-ordenes-produccion.component.html',
  styleUrls: ['./modificar-ordenes-produccion.component.css']
})
export class ModificarOrdenesProduccionComponent implements OnInit {

  nomCliente: nomCliente[] = [];
  apeCliente: apeCliente[] = [];
  nomProd: nomProd[] = [];
  nomUsuario: nomUsuario[] = [];
  estado: estado[] = [];
  codigo: number;
  flag: boolean = false;
  ordenProd = {} as DtoOrdenesProduccion;

  constructor(private servicio: OrdenesProduccionService, private spinner: NgxSpinnerService,
    private router: Router, private params: ActivatedRoute,
    private datePipe: DatePipe) {
    this.codigo = this.params.snapshot.params["id"];

  }

  ngOnInit(): void {
    this.obtenerOrden(this.codigo);
  }

  cargarSelects() {
    forkJoin({
      nomCliente: this.servicio.GetNCliente(),
      apeCliente: this.servicio.GetACliente(),
      nomProd: this.servicio.GetProducto(),
      nomUsuario: this.servicio.GetUsuario(),
      estado: this.servicio.GetEstado1(),
    }).subscribe({
      next: (resultado: any) => {
        this.nomCliente = resultado.nomCliente;
        this.apeCliente = resultado.apeCliente;
        this.nomProd = resultado.nomProd;
        this.nomUsuario = resultado.nomUsuario;
        this.estado = resultado.estado;
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

  obtenerOrden(id: number) {
    this.servicio.GetOrdenProduccionById(id).subscribe({
      next: (data) => {
        this.ordenProd = data,     
        console.log(this.ordenProd),
        this.cargarSelects()
      },
      error: (error) => { console.log(error) }
    })
  }

  actualizarOrden(f: NgForm) {
    if (f.valid) {
      this.servicio.PutOrden(this.ordenProd).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'La orden se ha actualizado correctamente',
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoOrdenProduccion");
          });
          console.log(resultado);
          console.log(f);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al actualizar la orden. Por favor, inténtelo de nuevo más tarde.',
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


  Limpiar(f: NgForm) {
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoOrdenProduccion")
  }

}
