import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaOrdenesProduccionComponent } from './alta-ordenes-produccion.component';

describe('AltaOrdenesProduccionComponent', () => {
  let component: AltaOrdenesProduccionComponent;
  let fixture: ComponentFixture<AltaOrdenesProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaOrdenesProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaOrdenesProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
