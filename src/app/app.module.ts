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
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


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
import { CrearStockMateriaPrimaComponent } from './Paginas/LadoAdmin/StockMateriaPrima/crear-stock-materia-prima/crear-stock-materia-prima.component';
import { ListaStockMateriaPrimaComponent } from './Paginas/LadoAdmin/StockMateriaPrima/lista-stock-materia-prima/lista-stock-materia-prima.component';
import { ModificarStockMateriaPrimaComponent } from './Paginas/LadoAdmin/StockMateriaPrima/modificar-stock-materia-prima/modificar-stock-materia-prima.component';
import { CrearStockProductoComponent } from './Paginas/LadoAdmin/StockProducto/crear-stock-producto/crear-stock-producto.component';
import { ListadoStockProductoComponent } from './Paginas/LadoAdmin/StockProducto/listado-stock-producto/listado-stock-producto.component';
import { ModificarStockProductoComponent } from './Paginas/LadoAdmin/StockProducto/modificar-stock-producto/modificar-stock-producto.component';
import { TerminosComponent } from './Paginas/LadoCliente/Soporte/terminos/terminos.component';
import { AyudaComponent } from './Paginas/LadoCliente/Soporte/ayuda/ayuda.component';






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
    CardInicioComponent,
    CrearStockMateriaPrimaComponent,
    ListaStockMateriaPrimaComponent,
    ModificarStockMateriaPrimaComponent,
    CrearStockProductoComponent,
    ListadoStockProductoComponent,
    ModificarStockProductoComponent,
    TerminosComponent,
    AyudaComponent



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
    MatPaginatorModule,
    CommonModule


  ],
  providers: [LoginService, ProductosService, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
