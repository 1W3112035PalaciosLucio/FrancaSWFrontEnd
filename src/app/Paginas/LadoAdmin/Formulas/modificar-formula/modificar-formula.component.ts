import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { MatPr, Prod, Formula } from 'src/app/Models/Formula/Formula';
import { FormulaService } from 'src/app/Services/Formula/formula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-formula',
  templateUrl: './modificar-formula.component.html',
  styleUrls: ['./modificar-formula.component.css']
})
export class ModificarFormulaComponent implements OnInit {

  flag: boolean = false;
  matPr: MatPr[] = [];
  prod: Prod[] = [];

  form!: FormGroup;
  formula = {} as Formula;
  codigo: number;



  constructor(private servicio: FormulaService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router, private params: ActivatedRoute) {
    this.codigo = this.params.snapshot.params["id"];
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      cantidad: ['', [Validators.required], [Validators.pattern('^[0-9]*$')]],
      matPr: ['', [Validators.required]],
      prod: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {
    this.obtenerFormula(this.codigo);
  }

  obtenerFormula(id: number) {
    this.servicio.GetFormulaById(id).subscribe({
      next: (data) => {
        this.formula = data,
          console.log(this.formula),
          this.cargarSelects()
      },
      error: (error) => { console.log(error) }
    })
  }

  cargarSelects() {
    forkJoin({
      prod: this.servicio.GetProd(),
      matPr: this.servicio.GetMatP(),
    }).subscribe({
      next: (resultado: any) => {
        this.prod = resultado.prod;
        this.matPr = resultado.matPr;
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

  actualizarFormula(f: NgForm) {
    if (f.valid) {
      this.servicio.PutFormula(this.formula).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.router.navigateByUrl("admin/listadoFormula");
          });
          console.log(resultado);
          console.log(f);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al actualizar la formula. Por favor, inténtelo de nuevo más tarde.',
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
    this.router.navigateByUrl("/admin/listadoFormula")
  }
}
