import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-inicio',
  templateUrl: './card-inicio.component.html',
  styleUrls: ['./card-inicio.component.css']
})
export class CardInicioComponent {
  @Input() codigo = 0;
  @Input() nombre = "";
  @Input() descripcion = "";
  @Input() imagen = "";
}
