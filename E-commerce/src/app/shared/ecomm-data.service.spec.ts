import { TestBed } from '@angular/core/testing';

import { EcommDataService } from './ecomm-data.service';

describe('EcommDataService', () => {
  let service: EcommDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
