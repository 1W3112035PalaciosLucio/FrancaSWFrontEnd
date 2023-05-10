import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrdenesProduccionComponent } from './listado-ordenes-produccion.component';

describe('ListadoOrdenesProduccionComponent', () => {
  let component: ListadoOrdenesProduccionComponent;
  let fixture: ComponentFixture<ListadoOrdenesProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoOrdenesProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoOrdenesProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
