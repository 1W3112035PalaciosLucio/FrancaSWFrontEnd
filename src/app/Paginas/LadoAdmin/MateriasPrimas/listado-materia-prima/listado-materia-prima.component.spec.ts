import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMateriaPrimaComponent } from './listado-materia-prima.component';

describe('ListadoMateriaPrimaComponent', () => {
  let component: ListadoMateriaPrimaComponent;
  let fixture: ComponentFixture<ListadoMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
