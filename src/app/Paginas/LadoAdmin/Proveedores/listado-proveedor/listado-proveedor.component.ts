import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtoLista } from 'src/app/Models/Proveedor/DtoLista';
import { DtoListaPrecioMpProv } from 'src/app/Models/Proveedor/DtoListaPrecioMp';
import { DTOProveedor } from 'src/app/Models/Proveedor/Proveedor';
import { ProveedoresService } from 'src/app/Services/Proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-proveedor',
  templateUrl: './listado-proveedor.component.html',
  styleUrls: ['./listado-proveedor.component.css']
})
export class ListadoProveedorComponent implements OnInit {

  constructor(
    private servicio: ProveedoresService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  proveedor: DTOProveedor[] = [];
  listado: DtoLista[] = [];
  filtro: string = '';
  nombre!: string;

  lista: DtoListaPrecioMpProv[] = [];
  estadoRespuesta: number;
  isNavVisible = true;

  @ViewChild('abrirModal') abrirModal: any;
  @ViewChild('cerrarModal') cerrarModal: any;

  ngOnInit(): void {
    this.CargarProveedor();
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

  cargarMpPrProv(id: number) {
    if (!id) {
      throw new Error("El ID no puede estar vacío.");
    }
    this.spinner.show();
    this.estadoRespuesta = 0; 
    this.servicio.GetConsultaMpByProveedor(id).subscribe({
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
            text: `El proveedor no tiene materias primas cargadas, por favor, carguele una materia prima para ver el detalle.`,
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
  CargarProveedor() {
    this.spinner.show();
    this.servicio.GetListadoProveedor().subscribe({
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


  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onClickNavLink(fragment: string) {
    this.scrollToSection(fragment);
  }

  SetData(proveedores_: DTOProveedor[]) {
    this.proveedor = proveedores_;
  }

  FiltrarTabla() {
    this.proveedor = this.proveedor.filter((item) =>
      item.nombre.includes(this.nombre), console.log(this.proveedor));
    this.SetData(this.proveedor);
    this.nombre = '';
  }



  agregar() {
    this.router.navigateByUrl('/admin/agregarProveedor');
  }

  Modificar(id: number) {
    this.router.navigateByUrl('admin/modificarProveedor/' + id);
  }

  CrearPrecio(id: number) {
    this.router.navigateByUrl('admin/crearPrecio/' + id);
  }

  ModificarPrecio(id: number) {
    this.router.navigateByUrl('admin/modificarPrecio/' + id);
  }
  filtrarTabla() {
    if (this.filtro.length === 0 || this.filtro.length <= 3) {
      this.CargarProveedor();
    } else {
      this.listado = this.listado.filter((item) =>
        item.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.apellido.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.localidad.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.provincia.toLowerCase().includes(this.filtro.toLowerCase()) ||
        item.telefono.toString().includes(this.filtro.toLowerCase())
      );
      this.SetData(this.proveedor);
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
        default:
          return 0;
      }
    });
  }

  Desactivar(id: number) {
    Swal.fire({
      title: '¿Deseas desactivar este proveedor?',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: 'Si',
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
        this.servicio.DesactivarProveedor(id).subscribe({
          next: (resultado) => {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E'
            }),
              this.CargarProveedor()
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

  Activar(id: number) {
    Swal.fire({
      title: '¿Deseas activar este proveedor?',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: 'Si',
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
        this.servicio.ActivarProveedor(id).subscribe({
          next: (resultado) => {
            Swal.fire({
              icon: 'success',
              text: resultado.message,
              confirmButtonColor: '#162B4E'
            }), this.CargarProveedor()
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
