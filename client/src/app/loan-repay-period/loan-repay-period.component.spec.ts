import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepayPeriodComponent } from './loan-repay-period.component';

describe('LoanRepayPeriodComponent', () => {
  let component: LoanRepayPeriodComponent;
  let fixture: ComponentFixture<LoanRepayPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepayPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepayPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
