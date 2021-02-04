import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepayupdateComponent } from './loan-repayupdate.component';

describe('LoanRepayupdateComponent', () => {
  let component: LoanRepayupdateComponent;
  let fixture: ComponentFixture<LoanRepayupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepayupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepayupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
