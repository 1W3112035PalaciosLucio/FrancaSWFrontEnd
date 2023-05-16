import { TestBed } from '@angular/core/testing';

import { ItemsProductoService } from './items-producto.service';

describe('ItemsProductoService', () => {
  let service: ItemsProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
