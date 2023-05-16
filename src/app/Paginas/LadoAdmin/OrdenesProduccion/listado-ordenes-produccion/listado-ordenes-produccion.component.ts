import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { estado } from 'src/app/Models/OrdenesProduccion/Combos/CombosOrdenProd';
import { OrdenesProduccion } from 'src/app/Models/OrdenesProduccion/OrdenesProduccion';
import { OrdenesProduccionService } from 'src/app/Services/OrdenesProduccion/ordenes-produccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-ordenes-produccion',
  templateUrl: './listado-ordenes-produccion.component.html',
  styleUrls: ['./listado-ordenes-produccion.component.css']
})
export class ListadoOrdenesProduccionComponent implements OnInit {

  nombre!: string;
  listado: OrdenesProduccion[] = [];
  filtro: string = '';
  numeroOrden: number;
  idEstadoOrdenProduccion: number;

  numeroOrdenSeleccionado: number;

  estado: estado[] = [];

  @ViewChild('abrirModal') abrirModal: any;
  @ViewChild('cerrarModal') cerrarModal: any;

  constructor(
    private servicio: OrdenesProduccionService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarOrdenProd();
    this.cargarSelects();
  }
  setNumeroOrdenSeleccionado(numeroOrden: number) {
    this.numeroOrdenSeleccionado = numeroOrden;
    console.log(this.numeroOrdenSeleccionado);
  }
  cargarSelects() {
    this.servicio.GetEstado2().subscribe({
      next: (resultado: any) => { this.estado = resultado },
      error: (e: any) => (console.log(e.error))
    })
  }

  cargarOrdenProd() {
    this.spinner.show();
    this.servicio.GetListadoOrdenProduccion().subscribe({
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
    this.router.navigateByUrl('/admin/modificarOrdenProduccion/' + id);
  }

  agregar() {
    this.router.navigateByUrl('/admin/crearOrdenProduccion');
  }

  SetData(listado_: OrdenesProduccion[]) {
    this.listado = listado_;
  }

  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarOrdenProd();
    } else {
      this.listado = this.listado.filter((item) =>

        item.nombreCliente.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.numeroOrden.toString().includes(this.filtro.toLowerCase()) ||
        item.cantidad.toString().includes(this.filtro.toLowerCase()) ||
        item.apellidoCliente.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.nombreProd.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.nombreUsuario.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.fechaEntrega.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.estadoOrden.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.fechaPedido.toString().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.listado);
    }
  }

  actualizarOrden() {
    this.servicio.PutEstadoOrden(this.numeroOrdenSeleccionado, this.idEstadoOrdenProduccion).subscribe({
      next: (resultado: any) => {
        if (resultado.ok == true) {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          }).then(() => {
            this.cargarOrdenProd();
            this.cerrarModal.nativeElement.click();
          })
        } else {
          Swal.fire({
            icon: 'warning',
            text: resultado.message,
            confirmButtonColor: '#162B4E'
          });
          console.log(resultado);
        }
      },
      error: (e: any) => console.log(e.error)
    });
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
        case 'nombreCliente':
          return compare(a.nombreCliente, b.nombreCliente, isAsc);
        case 'cantidad':
          return compare(a.cantidad, b.cantidad, isAsc);
        case 'apellidoCliente':
          return compare(a.apellidoCliente, b.apellidoCliente, isAsc);
        case 'nombreProd':
          return compare(a.nombreProd, b.nombreProd, isAsc);
        case 'fechaPedido':
          return compare(a.fechaPedido.toString(), b.fechaPedido.toString(), isAsc);
        case 'fechaEntrega':
          return compare(a.fechaEntrega.toString(), b.fechaEntrega.toString(), isAsc);
        case 'nombreUsuario':
          return compare(a.nombreUsuario, b.nombreUsuario, isAsc);
        case 'numeroOrden':
          return compare(a.numeroOrden, b.numeroOrden, isAsc);
        case 'estadoOrden':
          return compare(a.estadoOrden, b.estadoOrden, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
