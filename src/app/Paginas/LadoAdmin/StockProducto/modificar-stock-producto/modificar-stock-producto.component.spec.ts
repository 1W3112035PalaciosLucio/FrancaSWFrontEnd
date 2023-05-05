import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarStockProductoComponent } from './modificar-stock-producto.component';

describe('ModificarStockProductoComponent', () => {
  let component: ModificarStockProductoComponent;
  let fixture: ComponentFixture<ModificarStockProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarStockProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarStockProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
