import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanrepayComponent } from './loanrepay.component';

describe('LoanrepayComponent', () => {
  let component: LoanrepayComponent;
  let fixture: ComponentFixture<LoanrepayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanrepayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanrepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
