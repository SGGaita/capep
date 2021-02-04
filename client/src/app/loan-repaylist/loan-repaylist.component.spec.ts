import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaylistComponent } from './loan-repaylist.component';

describe('LoanRepaylistComponent', () => {
  let component: LoanRepaylistComponent;
  let fixture: ComponentFixture<LoanRepaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
