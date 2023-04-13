import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMateriaPrimaComponent } from './modificar-materia-prima.component';

describe('ModificarMateriaPrimaComponent', () => {
  let component: ModificarMateriaPrimaComponent;
  let fixture: ComponentFixture<ModificarMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
