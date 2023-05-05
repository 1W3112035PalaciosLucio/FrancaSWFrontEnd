import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoStockProductoComponent } from './listado-stock-producto.component';

describe('ListadoStockProductoComponent', () => {
  let component: ListadoStockProductoComponent;
  let fixture: ComponentFixture<ListadoStockProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoStockProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoStockProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
