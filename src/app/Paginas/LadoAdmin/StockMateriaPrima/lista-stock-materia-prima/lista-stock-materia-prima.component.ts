import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoHistorialStockMp, HistorialStockMp } from 'src/app/Models/StockMateriaPrima/HistorialStockMP';
import { DtoListaStockMP, DtoStockMateriaPrima } from 'src/app/Models/StockMateriaPrima/StockMateriaPrima';
import { StockMateriaPrimaService } from 'src/app/Services/StockMateriPrima/stock-materia-prima.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-stock-materia-prima',
  templateUrl: './lista-stock-materia-prima.component.html',
  styleUrls: ['./lista-stock-materia-prima.component.css']
})
export class ListaStockMateriaPrimaComponent implements OnInit{
  nombre!: string;
  listado: DtoListaStockMP[] = [];
  materiaPrima: DtoStockMateriaPrima[] = [];
  filtro: string = '';
  isNavVisible = true;

  estadoRespuesta: number;
  lista: HistorialStockMp[] = [];
  @ViewChild('abrirModal') abrirModal: any;
  @ViewChild('cerrarModal') cerrarModal: any;

  constructor(
    private servicio: StockMateriaPrimaService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarStockMP();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isNavVisible = !entry.isIntersecting;
      });
    });

    const target = document.getElementById('barraNav');
    if (target) {
      observer.observe(target);
    }
  }

  getColorClass(stockMp: any): string {
    return stockMp.cantidad >= stockMp.stockMinimo ? 'color-verde' : 'color-rojo';
  }

  cargarHistorial(id: number) {
    if (!id) {
      throw new Error("El ID no puede estar vacío.");
    }
    this.spinner.show();
    this.estadoRespuesta = 0;
    this.servicio.GetListadoHistorialStockMpById(id).subscribe({
      next: (resultado) => {
        this.lista = resultado;

        console.log(resultado);
        this.spinner.hide();
      },
      error: (error) => {
        this.estadoRespuesta = error.status;
        if (this.estadoRespuesta === 400) {
          Swal.fire({
            title: "¡Error!",
            text: `El stock no tiene movimientos realizados!`,
            confirmButtonColor: '#1d3763'
          });
        } else {
          Swal.fire({
            title: "¡Error!",
            text: error.error,
            confirmButtonColor: '#1d3763'
          });
        }
        console.log(error.status);
        this.spinner.hide();
      }
    });
  }

  cargarStockMP() {
    this.spinner.show();
    this.servicio.GetListadoStockMateriaPrima().subscribe({
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
    this.router.navigateByUrl('/admin/modificarStockMateriaPrima/' + id);
  }

  agregar() {
    this.router.navigateByUrl('/admin/crearStockMateriaPrima');
  }

  SetData(materiaPrima_: DtoStockMateriaPrima[]) {
    this.materiaPrima = materiaPrima_;
  }

  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarStockMP();
    } else {
      this.listado = this.listado.filter((item) =>
        item.descripcion.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.cantidad.toString().includes(this.filtro.toLowerCase()) ||
        item.precio.toString().includes(this.filtro.toLowerCase()) ||
        item.stockMinimo.toString().includes(this.filtro.toLowerCase()) ||
        item.stockInicial.toString().includes(this.filtro.toLowerCase()) ||
        item.fechaUltimaActualizacion.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.fechaUltimoPrecio.toString().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.materiaPrima);
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
        case 'descripcion':
          return compare(a.descripcion, b.descripcion, isAsc);
        case 'cantidad':
          return compare(a.cantidad, b.cantidad, isAsc);
        case 'precio':
          return compare(a.precio, b.precio, isAsc);
        case 'stockMinimo':
          return compare(a.stockMinimo, b.stockMinimo, isAsc);
        case 'fechaUltimoPrecio':
          return compare(a.fechaUltimoPrecio.toString(), b.fechaUltimoPrecio.toString(), isAsc);
        case 'fechaUltimaActualizacion':
          return compare(a.fechaUltimaActualizacion.toString(), b.fechaUltimaActualizacion.toString(), isAsc);
        case 'stockInicial':
          return compare(a.stockInicial, b.stockInicial, isAsc);
        default:
          return 0;
      }
    });
  }
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onClickNavLink(fragment: string) {
    this.scrollToSection(fragment);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

