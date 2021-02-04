import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNewLoansComponent } from './branch-new-loans.component';

describe('BranchNewLoansComponent', () => {
  let component: BranchNewLoansComponent;
  let fixture: ComponentFixture<BranchNewLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchNewLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchNewLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
