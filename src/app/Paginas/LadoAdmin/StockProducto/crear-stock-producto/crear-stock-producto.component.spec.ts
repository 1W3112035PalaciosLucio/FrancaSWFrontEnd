import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearStockProductoComponent } from './crear-stock-producto.component';

describe('CrearStockProductoComponent', () => {
  let component: CrearStockProductoComponent;
  let fixture: ComponentFixture<CrearStockProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearStockProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearStockProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
