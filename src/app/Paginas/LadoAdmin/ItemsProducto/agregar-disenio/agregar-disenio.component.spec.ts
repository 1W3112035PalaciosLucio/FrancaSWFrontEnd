import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDisenioComponent } from './agregar-disenio.component';

describe('AgregarDisenioComponent', () => {
  let component: AgregarDisenioComponent;
  let fixture: ComponentFixture<AgregarDisenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDisenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDisenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
