import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearStockMateriaPrimaComponent } from './crear-stock-materia-prima.component';

describe('CrearStockMateriaPrimaComponent', () => {
  let component: CrearStockMateriaPrimaComponent;
  let fixture: ComponentFixture<CrearStockMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearStockMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearStockMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
