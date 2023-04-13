import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesDeProduccionComponent } from './ordenes-de-produccion.component';

describe('OrdenesDeProduccionComponent', () => {
  let component: OrdenesDeProduccionComponent;
  let fixture: ComponentFixture<OrdenesDeProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenesDeProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesDeProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
