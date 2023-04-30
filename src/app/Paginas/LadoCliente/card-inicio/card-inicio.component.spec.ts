import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInicioComponent } from './card-inicio.component';

describe('CardInicioComponent', () => {
  let component: CardInicioComponent;
  let fixture: ComponentFixture<CardInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
