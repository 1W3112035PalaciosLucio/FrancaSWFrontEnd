import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { MateriaPrimaService } from 'src/app/Services/MateriaPrima/materia-prima.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-materia-prima',
  templateUrl: './agregar-materia-prima.component.html',
  styleUrls: ['./agregar-materia-prima.component.css']
})
export class AgregarMateriaPrimaComponent implements OnInit {

  materiaPrima = {} as MateriaPrima;
  codigo: number;
  descripcion: string;
  form!: FormGroup;

  constructor(private servicio: MateriaPrimaService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  registrarMateriaPrima(f: NgForm) {
    console.log(this.materiaPrima)
    if (f.valid) {
      this.servicio.PostMateriaPrima(this.materiaPrima).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            title: resultado.message,
            confirmButtonColor: '#162B4E'
          }), this.materiaPrima = {} as MateriaPrima, f.resetForm(); this.spinner.hide();
        }, error: (e: any) => { alert(e.error); console.log(e); }
      })
    }
  }

  Limpiar(f: NgForm) {
    this.materiaPrima = {} as MateriaPrima;
    f.resetForm();
  }

  volver() {
    this.router.navigateByUrl("/admin/listadoMateriaPrima")
  }

}
