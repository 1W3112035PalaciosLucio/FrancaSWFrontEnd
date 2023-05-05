import { TestBed } from '@angular/core/testing';

import { StockMateriaPrimaService } from './stock-materia-prima.service';

describe('StockMateriaPrimaService', () => {
  let service: StockMateriaPrimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMateriaPrimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
