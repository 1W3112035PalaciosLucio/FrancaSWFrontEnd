import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { MateriaPrimaService } from 'src/app/Services/MateriaPrima/materia-prima.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-materia-prima',
  templateUrl: './modificar-materia-prima.component.html',
  styleUrls: ['./modificar-materia-prima.component.css']
})
export class ModificarMateriaPrimaComponent implements OnInit {

  
  form!: FormGroup;
  materiaPrima = {} as MateriaPrima;
  codigo: number;

  constructor(private servicio: MateriaPrimaService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private params: ActivatedRoute, private router: Router) {
    this.codigo = this.params.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.obtenerMateriaPrima(this.codigo);
  }

  obtenerMateriaPrima(id: number) {
    this.servicio.GetMateriaPrimaById(id).subscribe({
      next: (data) => { this.materiaPrima = data, console.log(this.materiaPrima)},
      error: (error) => { console.log(error) }
    })
  }

  actualizarMateriaPrima(f: NgForm) {
    if (f.valid) {
      this.servicio.PutMateriaPrima(this.materiaPrima).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizo la materia prima correctamente',
            confirmButtonColor: '#162B4E'
            
          }), this.router.navigateByUrl("admin/listadoMateriaPrima")
        },
        error: (e: any) => { console.log(e.error) }
      })
    }
  }


  volver() {
    this.router.navigateByUrl("admin/listadoMateriaPrima");
  }
}
