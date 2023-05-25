import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Color, ScaleType, ViewDimensions } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReporteMPStockMinimo, ReporteMateriaDisponible, ReporteOrdenesPendiente, ReporteOrdenesPendienteMp, ReportePrecioStockMP, ReporteStockMP, ReporteStockProd, ReporteStockProd1 } from 'src/app/Models/Reportes/Reportes';
import { ReportesService } from 'src/app/Services/Reportes/reportes.service';

@Component({
  selector: 'app-inicio-administrador',
  templateUrl: './inicio-administrador.component.html',
  styleUrls: ['./inicio-administrador.component.css']
})
export class InicioAdministradorComponent implements OnInit {
  isNavVisible = true;

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
  showXAxismp = true;
  showYAxismp = true;
  showLegendmp = true;
  showXAxisLabelmp = true;
  legendTitlemp = "MATERIA PRIMA";
  xAxisLabelmp = 'MATERIA PRIMA';
  showYAxisLabelmp = true;
  yAxisLabelmp = 'CANTIDAD';
  schemeTypemp = 'ordinal';

  colorScheme: Color[] = [
    { name: '#5AA454', selectable: true, group: ScaleType.Ordinal, domain: [] },
    { name: '#A10A28', selectable: true, group: ScaleType.Ordinal, domain: [] },
    { name: '#C7B42C', selectable: true, group: ScaleType.Ordinal, domain: [] },
    { name: '#AAAAAA', selectable: true, group: ScaleType.Ordinal, domain: [] }
  ];

  //REPORTE PRECIOS MATERIA PRIMA
  multi: any[];
  viewhP: [number, number] = [1450, 450];

  // options
  showXAxisRepPrecio: boolean = true;
  showYAxisRepPrecio: boolean = true;
  gradientRepPrecio: boolean = true;
  showLegendRepPrecio: boolean = true;
  showXAxisLabelRepPrecio: boolean = true;
  showYAxisLabelRepPrecio: boolean = true;
  xAxisLabelRepPrecio: string = 'FECHA';
  yAxisLabelRepPrecio: string = 'PRECIO';
  legendTitleRepPrecio: string = 'MATERIA PRIMA';


  //REPORTE ORDENES PENDIENTES
  singleOp: any[];
  viewOp: [number, number] = [1200, 350];

  // options
  gradientOp: boolean = true;
  showLegendOp: boolean = true;
  showLabelsOp: boolean = true;
  isDoughnutOp: boolean = false;

  //REPORTE ORDENES PENDIENTES MATERIA PRIMA
  singleOpMp: any[];
  viewOpMp: [number, number] = [500, 250];

  // options
  gradientOpMp: boolean = true;
  showLegendOpMp: boolean = true;
  showLabelsOpMp: boolean = true;
  isDoughnutOpMp: boolean = false;


  //REPORTE MATERIA PRIMA DISPONIBLE
  singleMpD: any[];
  viewMpD: [number, number] = [500, 250];

  // options
  gradientMpD: boolean = true;
  showLegendMpD: boolean = true;
  showLabelsMpD: boolean = true;
  isDoughnutMpD: boolean = false;

  //REPORTE MATERIA PRIMA SIN STOCK MINIMO
  singleMpSm: any[];
  viewMpSm: [number, number] = [1200, 350];

  // options
  showXAxisMpSm: boolean = true;
  showYAxisMpSm: boolean = true;
  gradientMpSm: boolean = false;
  showXAxisLabelMpSm: boolean = true;
  yAxisLabelMpSm: string = 'MATERIA PRIMA';
  showYAxisLabelMpSm: boolean = true;
  xAxisLabelMpSm: string = 'CANTIDAD';



  constructor(private reportesService: ReportesService, private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isNavVisible = !entry.isIntersecting;
      });
    });

    const target = document.getElementById('barraNav');
    if (target) {
      observer.observe(target);
    }

    this.reportesService.GetListadoReporteStockProd().subscribe((data: ReporteStockProd1[]) => {
      this.single = data.map(item => ({ name: item.nombre, value: item.cantidad }));
    });

    this.reportesService.GetListadoReporteStockMP().subscribe((data: ReporteStockMP[]) => {
      this.single1 = data.map(item => ({ name: item.descripcion, value: item.cantidad }));
    });

    this.reportesService.GetListadoReportePrecioMP().subscribe((data: ReportePrecioStockMP[]) => {
      this.multi = data.map((item) => ({
        name: item.fechaUltimaActualizacion,
        series: [
          {
            name: item.descripcion,
            value: item.precio
          }
        ]
      }));
    });

    this.reportesService.GetListadoReporteOrdenPendiente().subscribe((data: ReporteOrdenesPendiente[]) => {
      this.singleOp = data.map(item => ({ name: item.nombre, value: item.cantidad }));
    });

    this.reportesService.GetListadoReporteOrdenPendienteMp().subscribe((data: ReporteOrdenesPendienteMp[]) => {
      this.singleOpMp = data.map(item => ({ name: item.descripcion, value: item.cantidadMateriaPrima }));
    });

    this.reportesService.GetListadoReporteMPDisponible().subscribe((data: ReporteMateriaDisponible[]) => {
      this.singleMpD = data.map(item => ({ name: item.descripcion, value: item.cantidad }));
    });

    this.reportesService.GetListadoReporteMPStockMinimo().subscribe((data: ReporteMPStockMinimo[]) => {
      this.singleMpSm = data.map(item => ({ name: item.descripcion, value: item.cantidad }));
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

  stockMP() {
    this.router.navigateByUrl("/admin/listadoStockMateriaPrima")
  }
  stockP() {
    this.router.navigateByUrl("/admin/listadoStockProducto");
  }
  ordenP() {
    this.router.navigateByUrl("/admin/listadoOrdenProduccion");
  }

  // REPORTE PRODUCTO
  onSelect(event: any): void {
    console.log(event);
  }


  //REPORTE PRECIOS MATERIA PRIMA
  onSelect1(data: any): void {
    console.log('Item clicked', data);
    // console.log('Fecha:', data.series);
  }
  onActivate(data: any): void {
    console.log('Activate', data);
    //console.log('Fecha:', data.series);
  }
  onDeactivate(data: any): void {
    console.log('Deactivate', data);
    //console.log('Fecha:', data.series);
  }

  //REPORTE ORDENES PENDIENTES
  onSelectOp(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivateOp(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivateOp(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //REPORTE ORDENES PENDIENTES MATERIA PRIMA
  onSelectOpMp(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivateOpMp(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivateOpMp(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //REPORTE MATERIA PRIMA DISPONIBLE
  onSelectMpD(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivateMpD(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivateMpD(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //REPORTE MATERIA PRIMA SIN STOCK MINIMO
  onSelectMpSm(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivateMpSm(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivateMpSm(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
