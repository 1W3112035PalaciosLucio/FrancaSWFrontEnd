import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { DtoCliente } from 'src/app/Models/Cliente/Cliente';
import { DTOLocalidad } from 'src/app/Models/Proveedor/Localidad';
import { Provincia } from 'src/app/Models/Proveedor/Provincia';
import { ClientesService } from 'src/app/Services/Clientes/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  form!: FormGroup;

  cliente = {} as DtoCliente;
  flag: boolean = false;

  localidad: DTOLocalidad[] = [];
  provincia: Provincia[] = [];

  idProvincia: number;

  provinciaSeleccionada: string;

  constructor(private servicio: ClientesService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  iniciarForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      telefono: ['', [Validators.required], [Validators.pattern('^[0-9]*$')]]
    })
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.cargarSelects();
  }

  onProvinciaChange(event: any) {
    this.provinciaSeleccionada = event.target.value;
    console.log(this.provinciaSeleccionada);
  }

  cargarSelects() {
    forkJoin({
      provincia: this.servicio.GetProvincia(),
    }).subscribe({
      next: (resultado: any) => {
        this.provincia = resultado.provincia;
        const idProvinciaSeleccionada = this.cliente.idLocalidad;
        if (idProvinciaSeleccionada) {
          this.actualizarLocalidades(); // llamar a actualizarLocalidades() si hay una provincia seleccionada
        } else {
          this.spinner.hide();
        }
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

  actualizarLocalidades() {
    this.idProvincia = this.cliente.idProvincia;
    this.servicio.GetLocalidadesByProvincia(this.idProvincia).subscribe({
      next: (resultado: any) => {
        this.localidad = resultado;
        console.log(resultado);
      },
      error: (e: any) => {
        Swal.fire({
          title: "Error",
          text: e.error,
          confirmButtonColor: '#162B4E'
        });
        console.log(e.error);
      }
    });
  }

  registrarCliente(f: NgForm) {
    console.log(this.cliente)
    if (f.valid) {
      this.servicio.PostCliente(this.cliente).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E',
          });
          this.cliente = { ...this.cliente, idCliente: resultado.codigo };
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
    this.router.navigateByUrl("/admin/listadoCliente")
  }


}
