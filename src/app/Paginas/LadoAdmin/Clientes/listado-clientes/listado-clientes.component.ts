import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoCliente } from 'src/app/Models/Cliente/Cliente';
import { DtoLista } from 'src/app/Models/Cliente/DtoLista';
import { ClientesService } from 'src/app/Services/Clientes/clientes.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  constructor(
    private servicio: ClientesService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  cliente: DtoCliente[] = [];
  listado: DtoLista[] = [];
  filtro: string = '';
  nombre!: string;

  ngOnInit(): void {
    this.CargarCliente();
  }

  CargarCliente() {
    this.spinner.show();
    this.servicio.GetListadoCliente().subscribe({
      next: (resultado) => {
        this.listado = resultado;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error.status);
        this.spinner.hide();
      }
    });
  }

  SetData(clientes_: DtoCliente[]) {
    this.cliente = clientes_;
  }


  // FiltrarTabla() {
  //   this.cliente = this.cliente.filter((item) =>
  //     item.nombre.includes(this.nombre), console.log(this.cliente));
  //   this.SetData(this.cliente);
  //   this.nombre = '';
  // }
  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.CargarCliente();
    } else {
      this.listado = this.listado.filter((item) =>
        item.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.apellido.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.localidad.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.provincia.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.telefono.toString().includes(this.filtro.toLowerCase()) ||
        item.direccion.toLowerCase().includes(this.filtro.toLowerCase())

      );
      this.SetData(this.cliente);
    }
  }

  agregar() {
    this.router.navigateByUrl('/admin/agregarCliente');
  }

  Modificar(id: number) {
    this.router.navigateByUrl('admin/modificarCliente/' + id);
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

        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'apellido':
          return compare(a.apellido, b.apellido, isAsc);
        case 'localidad':
          return compare(a.localidad, b.localidad, isAsc);
        case 'provincia':
          return compare(a.provincia, b.provincia, isAsc);
        case 'telefono':
          return compare(a.telefono, b.telefono, isAsc);
        case 'direccion':
          return compare(a.direccion, b.direccion, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

