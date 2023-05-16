import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { apeCliente, estado, nomCliente, nomProd, nomUsuario } from 'src/app/Models/OrdenesProduccion/Combos/CombosOrdenProd';
import { DtoOrdenesProduccion, OrdenesProduccion } from 'src/app/Models/OrdenesProduccion/OrdenesProduccion';
import { OrdenesProduccionService } from 'src/app/Services/OrdenesProduccion/ordenes-produccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-ordenes-produccion',
  templateUrl: './alta-ordenes-produccion.component.html',
  styleUrls: ['./alta-ordenes-produccion.component.css']
})
export class AltaOrdenesProduccionComponent implements OnInit {

  flag: boolean = false;
  nomCliente: nomCliente[] = [];
  apeCliente: apeCliente[] = [];
  nomProd: nomProd[] = [];
  nomUsuario: nomUsuario[] = [];
  estado: estado[] = [];
  form!: FormGroup;
  ordenProd = {} as DtoOrdenesProduccion;
  codigo: number;



  constructor(private servicio: OrdenesProduccionService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) {

  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      nomCliente: ['', [Validators.required]],
      apeCliente: ['', [Validators.required]],
      nomProd: ['', [Validators.required]],
      nomUsuario: ['', [Validators.required]],
      estado: [1, [Validators.required]],
      fechaPedido: ['', [Validators.required]],
      fechaEntrega: ['', [Validators.required]],
      numeroOrden: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {
    this.cargarSelects();
    this.iniciarForm();
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

  registrarOrden(f: NgForm) {
    console.log(this.ordenProd)
    if (f.valid) {
      this.servicio.PostOrdenProduccion(this.ordenProd).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E',
          });
          this.ordenProd = { ...this.ordenProd };
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
    this.router.navigateByUrl("/admin/listadoOrdenProduccion")
  }

}
