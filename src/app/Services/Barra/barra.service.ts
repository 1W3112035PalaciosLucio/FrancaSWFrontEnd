import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarraService {
  private barraNavSelected: boolean = false;
  constructor() { }

  private barraNavSelectedSubject = new Subject<boolean>();
  barraNavSelected$ = this.barraNavSelectedSubject.asObservable();

  setBarraNavSelected(selected: boolean) {
    this.barraNavSelectedSubject.next(selected);
  }

  getBarraNavSelected(): boolean {
    return this.barraNavSelected;
  }

}
