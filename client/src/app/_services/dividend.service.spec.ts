import { TestBed } from '@angular/core/testing';

import { DividendService } from './dividend.service';

describe('DividendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DividendService = TestBed.get(DividendService);
    expect(service).toBeTruthy();
  });
});
