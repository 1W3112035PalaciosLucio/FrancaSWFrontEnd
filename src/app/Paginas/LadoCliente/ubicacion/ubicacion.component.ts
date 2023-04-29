import { Component, Input, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';
export const DEFAULT_LAT = 48.20807;
export const DEFAULT_LON = 16.37320;
export const TITULO = 'Proyecto';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  private map: any;
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() titulo: string = TITULO;
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
  private initMap(): void {
    //configuración del mapa
    this.map = L.map('map', {
      center: [this.lat, this.lon],
      attributionControl: false,
      zoom: 14
    });

    //iconos personalizados
    var iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    });

    //marca con pop up
    const lon = this.lon + 0.009;
    const lat = this.lat + 0.009;
    const marker = L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
    marker.addTo(this.map);



    tiles.addTo(this.map);
  }

}
