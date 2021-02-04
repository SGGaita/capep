import { TestBed } from '@angular/core/testing';

import { LoanRatesService } from './loan-rates.service';

describe('LoanRatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanRatesService = TestBed.get(LoanRatesService);
    expect(service).toBeTruthy();
  });
});
