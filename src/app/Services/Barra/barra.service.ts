import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarraService {
  private barraNavSelected: boolean = false;
  private barraNavSelectedSubject = new Subject<boolean>();
  barraNavSelected$ = this.barraNavSelectedSubject.asObservable();
  
  constructor() { }

  setBarraNavSelected(selected: boolean) {
    this.barraNavSelectedSubject.next(selected);
  }

  getBarraNavSelected(): boolean {
    return this.barraNavSelected;
  }

}
