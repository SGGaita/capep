import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDeclinedLoansComponent } from './branch-declined-loans.component';

describe('BranchDeclinedLoansComponent', () => {
  let component: BranchDeclinedLoansComponent;
  let fixture: ComponentFixture<BranchDeclinedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchDeclinedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDeclinedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
