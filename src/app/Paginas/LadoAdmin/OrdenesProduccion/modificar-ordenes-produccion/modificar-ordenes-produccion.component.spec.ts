import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOrdenesProduccionComponent } from './modificar-ordenes-produccion.component';

describe('ModificarOrdenesProduccionComponent', () => {
  let component: ModificarOrdenesProduccionComponent;
  let fixture: ComponentFixture<ModificarOrdenesProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOrdenesProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarOrdenesProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
