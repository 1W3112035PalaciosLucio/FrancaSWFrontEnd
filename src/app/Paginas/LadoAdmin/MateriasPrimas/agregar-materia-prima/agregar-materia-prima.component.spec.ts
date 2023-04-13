import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMateriaPrimaComponent } from './agregar-materia-prima.component';

describe('AgregarMateriaPrimaComponent', () => {
  let component: AgregarMateriaPrimaComponent;
  let fixture: ComponentFixture<AgregarMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
