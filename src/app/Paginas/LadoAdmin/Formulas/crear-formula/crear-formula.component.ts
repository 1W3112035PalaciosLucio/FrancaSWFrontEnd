import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Formula, MatPr, Prod } from 'src/app/Models/Formula/Formula';
import { FormulaService } from 'src/app/Services/Formula/formula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-formula',
  templateUrl: './crear-formula.component.html',
  styleUrls: ['./crear-formula.component.css']
})
export class CrearFormulaComponent implements OnInit{

  flag: boolean = false;
  matPr: MatPr[] = [];
  prod: Prod[] = [];

  form!: FormGroup;
  formula = {} as Formula;
  codigo: number;



  constructor(private servicio: FormulaService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private router: Router) {

  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      cantidad: ['', [Validators.required], [Validators.pattern('^[0-9]*$')]],
      matPr: ['', [Validators.required]],
      prod: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {
    this.cargarSelects();
    this.iniciarForm();
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
  registrarFormula(f: NgForm) {
    console.log(this.formula);
    if (f.valid) {
      this.servicio.PostFormula(this.formula).subscribe({
        next: (resultado: any) => {
          if (resultado.ok === true) {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E',
            }).then(() => {
              this.formula = { ...this.formula };
              f.resetForm();
              this.volver();
              this.spinner.hide();
            });
          } else {
            Swal.fire({
              title: 'Error',
              icon: 'warning',
              text: resultado.message,
              confirmButtonColor: '#162B4E',
            });
            console.log(resultado);
            this.spinner.hide();
          }
        },
        error: (e: any) => {
          Swal.fire({
            title: 'Error',
            text:
              'Se ha producido un error al cargar la fórmula. Por favor, inténtelo de nuevo más tarde.',
            confirmButtonColor: '#162B4E',
          });
          console.log(e);
          this.spinner.hide();
        },
      });
    } else {
      Swal.fire({
        title: 'Error',
        text:
          'El formulario es inválido. Por favor, corrija los errores antes de continuar.',
        confirmButtonColor: '#162B4E',
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
