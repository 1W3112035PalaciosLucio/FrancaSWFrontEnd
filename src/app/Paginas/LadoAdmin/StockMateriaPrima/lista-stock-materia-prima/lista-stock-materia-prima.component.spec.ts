import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStockMateriaPrimaComponent } from './lista-stock-materia-prima.component';

describe('ListaStockMateriaPrimaComponent', () => {
  let component: ListaStockMateriaPrimaComponent;
  let fixture: ComponentFixture<ListaStockMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaStockMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaStockMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
