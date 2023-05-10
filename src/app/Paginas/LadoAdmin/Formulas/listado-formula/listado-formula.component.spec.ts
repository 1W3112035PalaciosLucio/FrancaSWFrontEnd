import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFormulaComponent } from './listado-formula.component';

describe('ListadoFormulaComponent', () => {
  let component: ListadoFormulaComponent;
  let fixture: ComponentFixture<ListadoFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
