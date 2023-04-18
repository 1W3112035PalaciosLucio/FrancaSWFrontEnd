import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Localidad } from 'src/app/Models/Proveedor/Localidad';
import { DTOProveedor, Proveedor } from 'src/app/Models/Proveedor/Proveedor';
import { Provincia } from 'src/app/Models/Proveedor/Provincia';
import { ProveedoresService } from 'src/app/Services/Proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.css']
})
export class ModificarProveedorComponent implements OnInit {

  form!: FormGroup;

  proveedor = {} as Proveedor;
  proveedorr = {} as DTOProveedor;
  flag: boolean = false;
  idProveedor: number;

  localidad: Localidad[] = [];
  provincia: Provincia[] = [];

  idProvincia: number;

  constructor(private servicio: ProveedoresService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private params: ActivatedRoute) {
    this.idProveedor = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.obtenerProveedor(this.idProveedor);
  }

  obtenerProveedor(id: number) {
    this.servicio.GetProveedorByIdd(id).subscribe({
      next: (data) => { this.proveedorr = data, console.log(this.proveedorr), this.cargarSelectss(), this.actualizarLocalidades() },
      error: (error) => { console.log(error) }
    })
  }

  cargarSelectss() {
    forkJoin({
      provincia: this.servicio.GetProvincia(),
    }).subscribe({
      next: (resultado: any) => {
        this.provincia = resultado.provincia;
        const idProvinciaSeleccionada = this.proveedor.idLocalidad;
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
    this.idProvincia = this.proveedorr.idProvincia;
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

  actualizarProveedor(f: NgForm) {
    if (f.valid) {
      this.servicio.PutProveedor(this.proveedorr).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'El proveedor se ha actualizado correctamente',
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoProveedor");
          });
          console.log(resultado);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al actualizar el proveedor. Por favor, inténtelo de nuevo más tarde.',
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
    this.router.navigateByUrl("/admin/listadoProveedor")
  }

}
