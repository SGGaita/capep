import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAcceptedLoansComponent } from './branch-accepted-loans.component';

describe('BranchAcceptedLoansComponent', () => {
  let component: BranchAcceptedLoansComponent;
  let fixture: ComponentFixture<BranchAcceptedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAcceptedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAcceptedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
