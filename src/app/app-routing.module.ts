import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioAdministradorComponent } from './Paginas/LadoAdmin/inicio-administrador/inicio-administrador.component';
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
import { CrearPrecioComponent } from './Paginas/LadoAdmin/Proveedores/ProvMatPrima/crear-precio/crear-precio.component';
import { ModificarPrecioComponent } from './Paginas/LadoAdmin/Proveedores/ProvMatPrima/modificar-precio/modificar-precio.component';
import { CrearClienteComponent } from './Paginas/LadoAdmin/Clientes/crear-cliente/crear-cliente.component';
import { ListadoClientesComponent } from './Paginas/LadoAdmin/Clientes/listado-clientes/listado-clientes.component';
import { ModificarClienteComponent } from './Paginas/LadoAdmin/Clientes/modificar-cliente/modificar-cliente.component';
import { ListadoCatalogoComponent } from './Paginas/LadoAdmin/CatalogoAdm/listado-catalogo/listado-catalogo.component';
import { CrearCatalogoComponent } from './Paginas/LadoAdmin/CatalogoAdm/crear-catalogo/crear-catalogo.component';
import { ModificarCatalogoComponent } from './Paginas/LadoAdmin/CatalogoAdm/modificar-catalogo/modificar-catalogo.component';
import { CardComponent } from './Paginas/LadoCliente/card/card.component';
import { ListaStockMateriaPrimaComponent } from './Paginas/LadoAdmin/StockMateriaPrima/lista-stock-materia-prima/lista-stock-materia-prima.component';
import { CrearStockMateriaPrimaComponent } from './Paginas/LadoAdmin/StockMateriaPrima/crear-stock-materia-prima/crear-stock-materia-prima.component';
import { ModificarStockMateriaPrimaComponent } from './Paginas/LadoAdmin/StockMateriaPrima/modificar-stock-materia-prima/modificar-stock-materia-prima.component';
import { ListadoStockProductoComponent } from './Paginas/LadoAdmin/StockProducto/listado-stock-producto/listado-stock-producto.component';
import { CrearStockProductoComponent } from './Paginas/LadoAdmin/StockProducto/crear-stock-producto/crear-stock-producto.component';
import { ModificarStockProductoComponent } from './Paginas/LadoAdmin/StockProducto/modificar-stock-producto/modificar-stock-producto.component';
import { TerminosComponent } from './Paginas/LadoCliente/Soporte/terminos/terminos.component';
import { AyudaComponent } from './Paginas/LadoCliente/Soporte/ayuda/ayuda.component';
import { ListadoOrdenesProduccionComponent } from './Paginas/LadoAdmin/OrdenesProduccion/listado-ordenes-produccion/listado-ordenes-produccion.component';
import { AltaOrdenesProduccionComponent } from './Paginas/LadoAdmin/OrdenesProduccion/alta-ordenes-produccion/alta-ordenes-produccion.component';
import { ListadoFormulaComponent } from './Paginas/LadoAdmin/Formulas/listado-formula/listado-formula.component';
import { CrearFormulaComponent } from './Paginas/LadoAdmin/Formulas/crear-formula/crear-formula.component';
import { ModificarFormulaComponent } from './Paginas/LadoAdmin/Formulas/modificar-formula/modificar-formula.component';

const routes: Routes = [
  { path: '', component: InicioClienteComponent },
  { path: 'seguridad/login', component: LoginComponent },
  { path: 'cliente/catalogoCliente', component: CatalogoComponent },
  { path: 'cliente/contacto', component: ContactoComponent },
  { path: 'cliente/inicioCliente', component: InicioClienteComponent },
  { path: 'cliente/ubicacion', component: UbicacionComponent },
  { path: 'cliente/detalleCatalogo', component: DetalleCatalogoComponent },
  { path: 'cliente/terminos', component: TerminosComponent },
  { path: 'cliente/ayuda', component: AyudaComponent },


  { path: 'admin/inicioAdmin', component: InicioAdministradorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoCatalogo', component: ListadoCatalogoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearCatalogo', component: CrearCatalogoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarCatalogo/:id', component: ModificarCatalogoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/agregarCliente', component: CrearClienteComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoCliente', component: ListadoClientesComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarCliente/:id', component: ModificarClienteComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearProducto', component: CrearProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarProducto/:id', component: ModificarProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoProducto', component: ListadoProductosComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/agregarMateriaPrima', component: AgregarMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarMateriaPrima/:id', component: ModificarMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoMateriaPrima', component: ListadoMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoProveedor', component: ListadoProveedorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/agregarProveedor', component: CrearProveedorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarProveedor/:id', component: ModificarProveedorComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearPrecio/:id', component: CrearPrecioComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarPrecio/:id', component: ModificarPrecioComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoStockMateriaPrima', component: ListaStockMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearStockMateriaPrima', component: CrearStockMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarStockMateriaPrima/:id', component: ModificarStockMateriaPrimaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoStockProducto', component: ListadoStockProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearStockProducto', component: CrearStockProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarStockProducto/:id', component: ModificarStockProductoComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoOrdenProduccion', component: ListadoOrdenesProduccionComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearOrdenProduccion', component: AltaOrdenesProduccionComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/listadoFormula', component: ListadoFormulaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/crearFormula', component: CrearFormulaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } },
  { path: 'admin/modificarFormula/:id', component: ModificarFormulaComponent, canActivate: [AuthGuard], data: { roles: ['Adm'] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
