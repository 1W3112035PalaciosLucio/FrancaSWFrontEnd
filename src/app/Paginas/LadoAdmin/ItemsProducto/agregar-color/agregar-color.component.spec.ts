import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarColorComponent } from './agregar-color.component';

describe('AgregarColorComponent', () => {
  let component: AgregarColorComponent;
  let fixture: ComponentFixture<AgregarColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
