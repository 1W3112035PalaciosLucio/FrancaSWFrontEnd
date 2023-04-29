import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCatalogoComponent } from './listado-catalogo.component';

describe('ListadoCatalogoComponent', () => {
  let component: ListadoCatalogoComponent;
  let fixture: ComponentFixture<ListadoCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
