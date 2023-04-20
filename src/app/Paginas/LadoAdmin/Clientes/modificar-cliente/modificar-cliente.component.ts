import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { DtoCliente } from 'src/app/Models/Cliente/Cliente';
import { DTOLocalidad } from 'src/app/Models/Proveedor/Localidad';
import { Provincia } from 'src/app/Models/Proveedor/Provincia';
import { ClientesService } from 'src/app/Services/Clientes/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css']
})
export class ModificarClienteComponent {
  form!: FormGroup;

  cliente = {} as DtoCliente;
  flag: boolean = false;

  localidad: DTOLocalidad[] = [];
  provincia: Provincia[] = [];

  idCliente: number;
  idProvincia: number;

  provinciaSeleccionada: string;

  constructor(private servicio: ClientesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private params: ActivatedRoute) {
    this.idCliente = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.obtenerCliente(this.idCliente);
  }

  obtenerCliente(id: number) {
    this.servicio.GetClienteById(id).subscribe({
      next: (data) => { this.cliente = data, console.log(this.cliente), this.cargarSelects(), this.actualizarLocalidades() },
      error: (error) => { console.log(error) }
    })
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

  actualizarCliente(f: NgForm) {
    if (f.valid) {
      this.servicio.PutProveedor(this.cliente).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'El cliente se ha actualizado correctamente',
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoCliente");
          });
          console.log(resultado);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al actualizar el cliente. Por favor, inténtelo de nuevo más tarde.',
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
    this.router.navigateByUrl("/admin/listadoCliente")
  }


}
