import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoCatalogo, DtoListaCatalogo } from 'src/app/Models/Catalogo/Catalogo';
import { CatalogoService } from 'src/app/Services/Catalogo/catalogo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-catalogo',
  templateUrl: './listado-catalogo.component.html',
  styleUrls: ['./listado-catalogo.component.css']
})
export class ListadoCatalogoComponent implements OnInit {
  nombre!: string;
  listado: DtoListaCatalogo[] = [];
  catalogos: DtoCatalogo[] = [];
  filtro: string = '';


  constructor(
    private servicio: CatalogoService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    this.spinner.show();
    this.servicio.GetListadoCatalogo().subscribe({
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
    this.router.navigateByUrl('/admin/modificarCatalogo/' + id);
  }

  agregar() {
    this.router.navigateByUrl('/admin/crearCatalogo');
  }

  SetData(catalogos_: DtoCatalogo[]) {
    this.catalogos = catalogos_;
  }

  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.cargarCatalogos();
    } else {
      this.listado = this.listado.filter((item) =>
        item.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.codigo.toString().includes(this.filtro.toLowerCase()) ||
        item.colorProducto.toString().includes(this.filtro.toLowerCase()) ||
        item.tipoProducto.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.disenioProducto.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.precioBocha.toString().toLowerCase().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.catalogos);
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
        case 'codigo':
          return compare(a.codigo, b.codigo, isAsc);
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'colorProducto':
          return compare(a.colorProducto, b.colorProducto, isAsc);
        case 'disenioProducto':
          return compare(a.disenioProducto, b.disenioProducto, isAsc);
        case 'medidaProducto':
          return compare(a.medidaProducto, b.medidaProducto, isAsc);
        case 'tipoProducto':
          return compare(a.tipoProducto, b.tipoProducto, isAsc);
        case 'precioBocha':
          return compare(a.precioBocha, b.precioBocha, isAsc);
        default:
          return 0;
      }
    });
  }

  EliminarCatalogo(id: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este catálogo?',
      text:'Los cambios serán permanentes',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: "No",
      cancelButtonColor: "#dc3545",
      confirmButtonColor: "#1d3763",
      icon: "warning",
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.EliminarCatalogo(id).subscribe({
          next: (resultado) => {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E'
            }),
              this.cargarCatalogos()
          },
          error: (error) => {
            Swal.fire({
              title: "¡Error!",
              text: error.error,
              confirmButtonColor: '#1d3763'
            });
            console.log(error);
          }
        })
      } else if (result.isDenied) {

      }
    })
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
