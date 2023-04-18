import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { DTOLocalidad, Localidad } from 'src/app/Models/Proveedor/Localidad';
import { DTOProveedor, Proveedor } from 'src/app/Models/Proveedor/Proveedor';
import { Provincia } from 'src/app/Models/Proveedor/Provincia';
import { ProveedoresService } from 'src/app/Services/Proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {

  form!: FormGroup;

  proveedor = {} as DTOProveedor;
  flag: boolean = false;

  localidad: DTOLocalidad[] = [];
  provincia: Provincia[] = [];

  idProvincia: number;

  provinciaSeleccionada: string;


  constructor(private servicio: ProveedoresService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  iniciarForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
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
    this.idProvincia = this.proveedor.idProvincia;
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

  registrarProveedor(f: NgForm) {
    console.log(this.proveedor)
    if (f.valid) {
      this.servicio.PostProveedor(this.proveedor).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E',
          });
          this.proveedor = { ...this.proveedor, idProveedor: resultado.codigo };
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
    this.router.navigateByUrl("/admin/listadoProveedor")
  }

}
