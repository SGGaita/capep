import { TestBed } from '@angular/core/testing';

import { LoanRepayPeriodService } from './loan-repay-period.service';

describe('LoanRepayPeriodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanRepayPeriodService = TestBed.get(LoanRepayPeriodService);
    expect(service).toBeTruthy();
  });
});
