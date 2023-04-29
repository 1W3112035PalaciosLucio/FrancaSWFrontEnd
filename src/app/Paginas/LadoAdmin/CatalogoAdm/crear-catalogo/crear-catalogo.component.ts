import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data, error } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Catalogo, DtoCATALOGO, DtoCatalogo, DtoProdCat } from 'src/app/Models/Catalogo/Catalogo';
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
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css']
})
export class CrearCatalogoComponent implements OnInit {
  disenio: Disenio[] = [];
  color: Color[] = [];
  medida: Medida[] = [];
  precio: Precio[] = [];
  tipo: Tipo[] = [];

  prod: DtoProdCat[] = [];
  form!: FormGroup;
  producto = {} as DtoCATALOGO;

  codigo: number;
  flag: boolean = false;

  catalogo = {} as Catalogo;
  selectedFile: File = new File([], '');

  constructor(private servicio: ProductosService,
    private formBuilder: FormBuilder,
    private serviceCatalogo: CatalogoService,
    private spinner: NgxSpinnerService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.cargarProd();
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

  cargarProd() {
    this.servicio.GetProductos().subscribe((res: Producto[]) => {
      this.prod = res.map((producto: Producto) => ({
        idProducto: producto.idProducto,
        codigo: producto.codigo,
        nombre: producto.nombre,
        idTipoProducto: producto.idTipoProducto,
        idDisenioProducto: producto.idDisenioProducto,
        idColorProducto: producto.idColorProducto,
        idMedidaProducto: producto.idMedidaProducto,
        idPreciosBocha: producto.idPreciosBocha
      }));
      console.log(this.prod);
    })
  }

  cambioCodigo() {
    const codigo = this.producto.codigo;
    this.obtenerProdCod(codigo);
  }

  obtenerProdCod(codigo: number) {
    this.cargarSelects(this.producto.codigo);
  }

  cargarSelects(id: number) {
    this.spinner.show();
    this.serviceCatalogo.GetCatalogoComboId(id).subscribe({
      next: (resultado: any) => {

        this.producto.nombre = resultado.nombre;
        this.producto.idTipoProducto = resultado.idTipoProducto;
        this.producto.idDisenioProducto = resultado.idDisenioProducto;
        this.producto.idColorProducto = resultado.idColorProducto;
        this.producto.idMedidaProducto = resultado.idMedidaProducto;
        this.producto.idPreciosBocha = resultado.idPreciosBocha;

        this.spinner.hide();
        console.log("paso3")
        console.log(resultado);
      },
      error: (error) => {
        console.log(error.status);
        this.spinner.hide();
      },
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  registrarCatalogo(f: NgForm) {
    if (f.valid) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('idProducto', f.value.idProducto);
      formData.append('idCatalogo', "0");
      formData.append('descripcion', f.value.descripcion);

      this.serviceCatalogo.PostCatalogo(formData).subscribe({
        next: (resultado: any) => {
          Swal.fire({
            icon: 'success',
            text: resultado.message,
            confirmButtonColor: '#162B4E',
          });

          f.resetForm();
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
