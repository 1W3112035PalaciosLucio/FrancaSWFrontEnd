import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { DtoProdCat, DtoCATALOGO, Catalogo } from 'src/app/Models/Catalogo/Catalogo';
import { Color } from 'src/app/Models/Producto/ColorP';
import { Disenio } from 'src/app/Models/Producto/DiseñoP';
import { Medida } from 'src/app/Models/Producto/MedidaP';
import { Precio } from 'src/app/Models/Producto/PrecioP';
import { Producto } from 'src/app/Models/Producto/Producto';
import { Tipo } from 'src/app/Models/Producto/TipoP';
import { CatalogoService } from 'src/app/Services/Catalogo/catalogo.service';
import { ProductosService } from 'src/app/Services/Productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-catalogo',
  templateUrl: './modificar-catalogo.component.html',
  styleUrls: ['./modificar-catalogo.component.css']
})
export class ModificarCatalogoComponent {

  disenio: Disenio[] = [];
  color: Color[] = [];
  medida: Medida[] = [];
  precio: Precio[] = [];
  tipo: Tipo[] = [];

  prodd: DtoCATALOGO[] = [];

  prod: DtoProdCat[] = [];
  form!: FormGroup;
  producto = {} as DtoCATALOGO;

  cod: number;
  flag: boolean = false;

  catalogo = {} as Catalogo;
  selectedFile: File = new File([], '');

  constructor(private servicio: ProductosService,
    private formBuilder: FormBuilder,
    private serviceCatalogo: CatalogoService,
    private spinner: NgxSpinnerService,
    private router: Router, private params: ActivatedRoute) {
    this.cod = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.cargarProd(this.cod);
    this.cargarSelect();
  }

  cargarSelect() {
    forkJoin({
      color: this.servicio.GetColor(),
      disenio: this.servicio.GetDisenio(),
      medida: this.servicio.GetMedida(),
      precio: this.servicio.GetPrecio(),
      tipo: this.servicio.GetTipoProducto(),
    }).subscribe({
      next: (resultado: any) => {
        this.color = resultado.color;
        this.disenio = resultado.disenio;
        this.medida = resultado.medida;
        this.precio = resultado.precio;
        this.tipo = resultado.tipo;
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
  cargarProd(id: number) {
    this.serviceCatalogo.GetCatalogoId(id).subscribe({
      next: (data) => {
        this.producto = data;
        console.log(this.producto);
      },
      error: (error) => { console.log(error) }
    })
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  modificarCatalogo(f: NgForm, idCatalogo: number, idProducto: number) {
    if (f.valid) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('idProducto', idProducto.toString());
      formData.append('idCatalogo', idCatalogo.toString());
      formData.append('descripcion', f.value.descripcion);

      this.spinner.show();
      this.serviceCatalogo.PutCatalogo(formData).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E',
          });
          this.volver();
          this.spinner.hide();
        },
        error: (error: any) => {
          Swal.fire({
            title: "Error",
            text: error.message,
            confirmButtonColor: '#162B4E'
          });
          console.log(error);
          this.spinner.hide();
        }
      });
    }
    else {
      Swal.fire({
        title: "Error",
        text: "El formulario es invalido",
        confirmButtonColor: '#162B4E'
      });
    }
  }
  volver() {
    this.router.navigateByUrl("admin/listadoCatalogo");
  }
}
