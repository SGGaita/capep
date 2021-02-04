import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRateupdateComponent } from './loan-rateupdate.component';

describe('LoanRateupdateComponent', () => {
  let component: LoanRateupdateComponent;
  let fixture: ComponentFixture<LoanRateupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRateupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRateupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
