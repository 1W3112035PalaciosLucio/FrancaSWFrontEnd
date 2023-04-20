import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { DTOPrecioMateriaPrimaProveedor } from 'src/app/Models/Proveedor/PreMatPProv';
import { ProveedoresService } from 'src/app/Services/Proveedores/proveedores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-precio',
  templateUrl: './crear-precio.component.html',
  styleUrls: ['./crear-precio.component.css']
})


export class CrearPrecioComponent implements OnInit {

  codigo: number;
  materiaPrima: MateriaPrima[] = [];
  provPrecio = {} as DTOPrecioMateriaPrimaProveedor;
  flag: boolean = false;

  

  constructor(private servicio: ProveedoresService, private spinner: NgxSpinnerService,
    private params: ActivatedRoute, private router: Router) {
    this.codigo = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.obtenerProveedor(this.codigo);
  }

  obtenerProveedor(id: number) {
    this.servicio.GetProveedorByIdd(id).subscribe({
      next: (data) => { this.provPrecio = data, console.log(this.provPrecio), this.cargarSelects() },
      error: (error) => { console.log(error) }
    })
  }

  cargarSelects() {
    this.servicio.GetMateriaPrima().subscribe({
      next: (resultado: any) => { this.materiaPrima = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  cargarPrecio(f: NgForm) {
    if (f.valid) {
      this.servicio.PostPreciosMateriasPrimasProveedore(this.provPrecio).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: 'El precio se ha cargado correctamente',
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
            text: 'Se ha producido un error al cargar el precio. Por favor, inténtelo de nuevo más tarde.',
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
    this.router.navigateByUrl("admin/listadoProveedor");
  }

}