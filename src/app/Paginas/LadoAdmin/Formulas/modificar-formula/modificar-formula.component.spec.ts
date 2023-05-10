import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFormulaComponent } from './modificar-formula.component';

describe('ModificarFormulaComponent', () => {
  let component: ModificarFormulaComponent;
  let fixture: ComponentFixture<ModificarFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
