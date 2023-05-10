import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFormulaComponent } from './crear-formula.component';

describe('CrearFormulaComponent', () => {
  let component: CrearFormulaComponent;
  let fixture: ComponentFixture<CrearFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
