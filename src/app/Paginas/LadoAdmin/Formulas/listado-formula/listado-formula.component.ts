import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoForm, MatPr, Prod } from 'src/app/Models/Formula/Formula';
import { Formula } from 'src/app/Models/Formula/Formula';
import { FormulaService } from 'src/app/Services/Formula/formula.service';

@Component({
  selector: 'app-listado-formula',
  templateUrl: './listado-formula.component.html',
  styleUrls: ['./listado-formula.component.css']
})
export class ListadoFormulaComponent implements OnInit {

  constructor(
    private servicio: FormulaService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  formulas: Formula[] = [];

  nombre!: string;
  matPr: MatPr[] = [];
  prod: Prod[] = [];

  listado: DtoForm[] = [];

  filtro: string = '';


  ngOnInit(): void {
    this.cargarFormula();
  }

  SetData(formulas_: Formula[]) {
    this.formulas = formulas_;
  }


  cargarFormula() {
    this.spinner.show();
    this.servicio.GetListadoFormula().subscribe({
      next: (resultado) => {

        this.listado = resultado;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error.status);
        this.spinner.hide();
      },
    });
  }

  Modificar(id: number) {
    this.router.navigateByUrl('/admin/modificarFormula/' + id);
  }

  Agregar() {
    this.router.navigateByUrl('/admin/crearFormula');
  }

  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarFormula();
    } else {
      this.listado = this.listado.filter((item) =>
        item.nombreProd.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.nombreMatP.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.cantidadMateriaPrima.toString().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.formulas);
    }
  }

  sortData(sort: Sort) {
    const data = this.listado.slice();
    if (!sort.active || sort.direction === '') {
      this.listado = data;
      return;
    }
    this.listado = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombreProd':
          return compare(a.nombreProd, b.nombreProd, isAsc);
        case 'nombreMatP':
          return compare(a.nombreMatP, b.nombreMatP, isAsc);
        case 'cantidadMateriaPrima':
          return compare(a.cantidadMateriaPrima, b.cantidadMateriaPrima, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

