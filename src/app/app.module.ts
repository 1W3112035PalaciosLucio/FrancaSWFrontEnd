import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './General/Barra/barra-navegacion/barra-navegacion.component';
import { LoginComponent } from './Seguridad/Login/login/login.component';
import { CatalogoComponent } from './Paginas/LadoCliente/catalogo/catalogo.component';
import { ContactoComponent } from './Paginas/LadoCliente/contacto/contacto.component';
import { UbicacionComponent } from './Paginas/LadoCliente/ubicacion/ubicacion.component';
import { InicioClienteComponent } from './Paginas/LadoCliente/inicio-cliente/inicio-cliente.component';
import { InicioAdministradorComponent } from './Paginas/LadoAdmin/inicio-administrador/inicio-administrador.component';
import { OrdenesDeProduccionComponent } from './Paginas/LadoAdmin/ordenes-de-produccion/ordenes-de-produccion.component';
import { StockProductosComponent } from './Paginas/LadoAdmin/stock-productos/stock-productos.component';
import { StockMateriaPrimaComponent } from './Paginas/LadoAdmin/stock-materia-prima/stock-materia-prima.component';
import { LoginService } from './Services/login.service';
import { DetalleCatalogoComponent } from './Paginas/LadoCliente/detalle-catalogo/detalle-catalogo.component';
import { CrearProductoComponent } from './Paginas/LadoAdmin/Productos/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './Paginas/LadoAdmin/Productos/modificar-producto/modificar-producto.component';
import { ListadoProductosComponent } from './Paginas/LadoAdmin/Productos/listado-productos/listado-productos.component';
import { AgregarMateriaPrimaComponent } from './Paginas/LadoAdmin/MateriasPrimas/agregar-materia-prima/agregar-materia-prima.component';
import { ModificarMateriaPrimaComponent } from './Paginas/LadoAdmin/MateriasPrimas/modificar-materia-prima/modificar-materia-prima.component';
import { ListadoMateriaPrimaComponent } from './Paginas/LadoAdmin/MateriasPrimas/listado-materia-prima/listado-materia-prima.component';
import { ProductosService } from './Services/Productos/productos.service';
import { CrearProveedorComponent } from './Paginas/LadoAdmin/Proveedores/crear-proveedor/crear-proveedor.component';
import { ModificarProveedorComponent } from './Paginas/LadoAdmin/Proveedores/modificar-proveedor/modificar-proveedor.component';
import { ListadoProveedorComponent } from './Paginas/LadoAdmin/Proveedores/listado-proveedor/listado-proveedor.component';
import { CrearPrecioComponent } from './Paginas/LadoAdmin/Proveedores/ProvMatPrima/crear-precio/crear-precio.component';
import { ModificarPrecioComponent } from './Paginas/LadoAdmin/Proveedores/ProvMatPrima/modificar-precio/modificar-precio.component';
import { CrearClienteComponent } from './Paginas/LadoAdmin/Clientes/crear-cliente/crear-cliente.component';
import { ModificarClienteComponent } from './Paginas/LadoAdmin/Clientes/modificar-cliente/modificar-cliente.component';
import { ListadoClientesComponent } from './Paginas/LadoAdmin/Clientes/listado-clientes/listado-clientes.component';
import { CrearCatalogoComponent } from './Paginas/LadoAdmin/CatalogoAdm/crear-catalogo/crear-catalogo.component';
import { ModificarCatalogoComponent } from './Paginas/LadoAdmin/CatalogoAdm/modificar-catalogo/modificar-catalogo.component';
import { ListadoCatalogoComponent } from './Paginas/LadoAdmin/CatalogoAdm/listado-catalogo/listado-catalogo.component';
import { CardComponent } from './Paginas/LadoCliente/card/card.component';
import { CardInicioComponent } from './Paginas/LadoCliente/card-inicio/card-inicio.component';






@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    LoginComponent,
    CatalogoComponent,
    ContactoComponent,
    UbicacionComponent,
    InicioClienteComponent,
    InicioAdministradorComponent,
    OrdenesDeProduccionComponent,
    StockProductosComponent,
    StockMateriaPrimaComponent,
    DetalleCatalogoComponent,
    CrearProductoComponent,
    ModificarProductoComponent,
    ListadoProductosComponent,
    AgregarMateriaPrimaComponent,
    ModificarMateriaPrimaComponent,
    ListadoMateriaPrimaComponent,
    CrearProveedorComponent,
    ModificarProveedorComponent,
    ListadoProveedorComponent,
    CrearPrecioComponent,
    ModificarPrecioComponent,
    CrearClienteComponent,
    ModificarClienteComponent,
    ListadoClientesComponent,
    CrearCatalogoComponent,
    ModificarCatalogoComponent,
    ListadoCatalogoComponent,
    CardComponent,
    CardInicioComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule,
    NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule


  ],
  providers: [LoginService, ProductosService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
