import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoAdminComponent } from './Paginas/LadoAdmin/catalogo-admin/catalogo-admin.component';
import { ClientesComponent } from './Paginas/LadoAdmin/clientes/clientes.component';
import { InicioAdministradorComponent } from './Paginas/LadoAdmin/inicio-administrador/inicio-administrador.component';
import { OrdenesDeProduccionComponent } from './Paginas/LadoAdmin/ordenes-de-produccion/ordenes-de-produccion.component';
import { StockMateriaPrimaComponent } from './Paginas/LadoAdmin/stock-materia-prima/stock-materia-prima.component';
import { StockProductosComponent } from './Paginas/LadoAdmin/stock-productos/stock-productos.component';
import { CatalogoComponent } from './Paginas/LadoCliente/catalogo/catalogo.component';
import { ContactoComponent } from './Paginas/LadoCliente/contacto/contacto.component';
import { InicioClienteComponent } from './Paginas/LadoCliente/inicio-cliente/inicio-cliente.component';
import { UbicacionComponent } from './Paginas/LadoCliente/ubicacion/ubicacion.component';
import { LoginComponent } from './Seguridad/Login/login/login.component';
import { DetalleCatalogoComponent } from './Paginas/LadoCliente/detalle-catalogo/detalle-catalogo.component';
import { CrearProductoComponent } from './Paginas/LadoAdmin/Productos/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './Paginas/LadoAdmin/Productos/modificar-producto/modificar-producto.component';
import { ListadoProductosComponent } from './Paginas/LadoAdmin/Productos/listado-productos/listado-productos.component';
import { AgregarMateriaPrimaComponent } from './Paginas/LadoAdmin/MateriasPrimas/agregar-materia-prima/agregar-materia-prima.component';
import { ModificarMateriaPrimaComponent } from './Paginas/LadoAdmin/MateriasPrimas/modificar-materia-prima/modificar-materia-prima.component';
import { ListadoMateriaPrimaComponent } from './Paginas/LadoAdmin/MateriasPrimas/listado-materia-prima/listado-materia-prima.component';
import { ListadoProveedorComponent } from './Paginas/LadoAdmin/Proveedores/listado-proveedor/listado-proveedor.component';
import { CrearProveedorComponent } from './Paginas/LadoAdmin/Proveedores/crear-proveedor/crear-proveedor.component';
import { ModificarProveedorComponent } from './Paginas/LadoAdmin/Proveedores/modificar-proveedor/modificar-proveedor.component';
import { AuthGuard } from './Seguridad/Guards/auth.guard';

const routes: Routes = [
  { path: '', component: InicioClienteComponent },
  { path: 'seguridad/login', component: LoginComponent },
  { path: 'cliente/catalogoCliente', component: CatalogoComponent },
  { path: 'cliente/contacto', component: ContactoComponent },
  { path: 'cliente/inicioCliente', component: InicioClienteComponent },
  { path: 'cliente/ubicacion', component: UbicacionComponent },
  { path: 'cliente/detalleCatalogo', component: DetalleCatalogoComponent },
  { path: 'admin/inicioAdmin', component: InicioAdministradorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/ordenProduccion', component: OrdenesDeProduccionComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/stockMateriaPrima', component: StockMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/stockProducto', component: StockProductosComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/catalogoAdmin', component: CatalogoAdminComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/clientesAdmin', component: ClientesComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearProducto', component: CrearProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarProducto/:id', component: ModificarProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoProducto', component: ListadoProductosComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/agregarMateriaPrima', component: AgregarMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarMateriaPrima/:id', component: ModificarMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoMateriaPrima', component: ListadoMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoProveedor', component: ListadoProveedorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/agregarProveedor', component: CrearProveedorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarProveedor', component: ModificarProveedorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
