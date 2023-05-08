import { TestBed } from '@angular/core/testing';

import { StockProductosService } from './stock-productos.service';

describe('StockProductosService', () => {
  let service: StockProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
