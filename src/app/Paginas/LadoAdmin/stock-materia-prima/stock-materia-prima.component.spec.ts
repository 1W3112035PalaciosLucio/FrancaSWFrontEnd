import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMateriaPrimaComponent } from './stock-materia-prima.component';

describe('StockMateriaPrimaComponent', () => {
  let component: StockMateriaPrimaComponent;
  let fixture: ComponentFixture<StockMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
