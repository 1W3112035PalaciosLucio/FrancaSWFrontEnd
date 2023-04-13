import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MateriaPrima } from 'src/app/Models/MateriaPrima/MateriaPrima';
import { MateriaPrimaService } from 'src/app/Services/MateriaPrima/materia-prima.service';


@Component({
  selector: 'app-listado-materia-prima',
  templateUrl: './listado-materia-prima.component.html',
  styleUrls: ['./listado-materia-prima.component.css']
})
export class ListadoMateriaPrimaComponent implements OnInit {

  constructor(private servicio: MateriaPrimaService, private spinner: NgxSpinnerService,
    private router: Router) { }

  materiaPrima: MateriaPrima[] = [];
  descripcion!: string;

  filtro: string = '';



  ngOnInit(): void {
    this.cargarMateriaPrima();
  }


  SetData(materiaPrima_: MateriaPrima[]) {
    this.materiaPrima = materiaPrima_
  }

  cargarMateriaPrima() {
    this.spinner.show();
    this.servicio.GetMateriaPrima().subscribe({
      next: (resultado) => { this.SetData(resultado); this.spinner.hide(); },
      error: (error) => { console.log(error.status); this.spinner.hide(); }
    });
  }

  Modificar(id: number) {
    this.router.navigateByUrl("admin/modificarMateriaPrima/" + id)
  }

  FiltrarTabla() {
    this.materiaPrima = this.materiaPrima.filter(item => item.descripcion.includes(this.descripcion));
    this.SetData(this.materiaPrima);
    this.descripcion = "";
  }

  agregar() {
    this.router.navigateByUrl("/admin/agregarMateriaPrima")
  }

  filtrarTabla() {
    if (this.filtro.length === 0) {
      this.cargarMateriaPrima();
    } else {
      this.materiaPrima = this.materiaPrima.filter((item) =>
        item.descripcion.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.codigo.toString().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.materiaPrima);
    }
  }
}