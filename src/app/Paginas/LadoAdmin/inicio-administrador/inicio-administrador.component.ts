import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Color, ScaleType, ViewDimensions } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReporteStockMP, ReporteStockProd, ReporteStockProd1 } from 'src/app/Models/Reportes/Reportes';
import { ReportesService } from 'src/app/Services/Reportes/reportes.service';

@Component({
  selector: 'app-inicio-administrador',
  templateUrl: './inicio-administrador.component.html',
  styleUrls: ['./inicio-administrador.component.css']
})
export class InicioAdministradorComponent implements OnInit {

  // listado: ReporteStockProd[] = [];
  single: any[];
  single1: any[];

 // REPORTE PRODUCTO
  view: [number, number] = [1250, 450];
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  legendTitle = "PRODUCTOS";
  showXAxisLabel = true;
  xAxisLabel = 'PRODUCTO';
  showYAxisLabel = true;
  yAxisLabel = 'CANTIDAD';
  schemeType = 'ordinal';

  //REPORTE MATERIA PRIMA
  viewmp: [number, number] = [1250, 450];
  gradientmp = false;
  showXAxismp  = true;
  showYAxismp  = true;
  showLegendmp  = true;
  showXAxisLabelmp  = true;
  legendTitlemp = "MATERIA PRIMA";
  xAxisLabelmp  = 'MATERIA PRIMA';
  showYAxisLabelmp  = true;
  yAxisLabelmp  = 'CANTIDAD';
  schemeTypemp  = 'ordinal';

  colorScheme: Color[] = [
    { name: '#5AA454', selectable: true, group: ScaleType.Ordinal, domain: [] },
    { name: '#A10A28', selectable: true, group: ScaleType.Ordinal, domain: [] },
    { name: '#C7B42C', selectable: true, group: ScaleType.Ordinal, domain: [] },
    { name: '#AAAAAA', selectable: true, group: ScaleType.Ordinal, domain: [] }
  ];


  constructor(private reportesService: ReportesService, private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.reportesService.GetListadoReporteStockProd().subscribe((data: ReporteStockProd1[]) => {
      this.single = data.map(item => ({ name: item.nombre, value: item.cantidad }));
    });

    this.reportesService.GetListadoReporteStockMP().subscribe((data: ReporteStockMP[]) => {
      this.single1 = data.map(item => ({ name: item.descripcion, value: item.cantidad }));
    });

   // this.cargarReporteStockProd();
  }

  onSelect(event: any): void {
    console.log(event);
  }

  stockMP(){
    this.router.navigateByUrl("/admin/listadoStockMateriaPrima")
  }
  stockP(){
    this.router.navigateByUrl("/admin/listadoStockProducto");
  }

  // cargarReporteStockProd() {
  //   this.spinner.show();
  //   this.reportesService.GetListaReporteStockProd().subscribe({
  //     next: (resultado) => {

  //       this.listado = resultado;
  //       this.spinner.hide();
  //     },
  //     error: (error) => {
  //       console.log(error.status);
  //       this.spinner.hide();
  //     },
  //   });
  // }


  // sortData(sort: Sort) {
  //   const data = this.listado.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.listado = data;
  //     return;
  //   }

  //   this.listado = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'codigo':
  //         return compare(a.codigo, b.codigo, isAsc);
  //       case 'nombre':
  //         return compare(a.nombre, b.nombre, isAsc);
  //       case 'tipoProducto':
  //         return compare(a.tipoProducto, b.tipoProducto, isAsc);
  //       case 'colorProducto':
  //         return compare(a.colorProducto, b.colorProducto, isAsc);
  //       case 'disenioProducto':
  //         return compare(a.disenioProducto, b.disenioProducto, isAsc);
  //       case 'cantidad':
  //         return compare(a.cantidad, b.cantidad, isAsc);
  //       case 'precioBocha':
  //         return compare(a.precioBocha, b.precioBocha, isAsc);
  //       case 'medidaProducto':
  //         return compare(a.medidaProducto, b.medidaProducto, isAsc);
  //       case 'fechaUltimaActualizacion':
  //         return compare(a.fechaUltimaActualizacion.toString(), b.fechaUltimaActualizacion.toString(), isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }
}
// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }