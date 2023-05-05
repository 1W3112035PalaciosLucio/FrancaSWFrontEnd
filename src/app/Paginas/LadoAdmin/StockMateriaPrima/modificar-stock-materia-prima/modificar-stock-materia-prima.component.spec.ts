import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarStockMateriaPrimaComponent } from './modificar-stock-materia-prima.component';

describe('ModificarStockMateriaPrimaComponent', () => {
  let component: ModificarStockMateriaPrimaComponent;
  let fixture: ComponentFixture<ModificarStockMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarStockMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarStockMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
