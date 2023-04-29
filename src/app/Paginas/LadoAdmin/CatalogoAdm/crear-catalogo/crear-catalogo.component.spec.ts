import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCatalogoComponent } from './crear-catalogo.component';

describe('CrearCatalogoComponent', () => {
  let component: CrearCatalogoComponent;
  let fixture: ComponentFixture<CrearCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
