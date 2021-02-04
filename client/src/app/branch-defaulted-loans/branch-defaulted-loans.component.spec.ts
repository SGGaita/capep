import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDefaultedLoansComponent } from './branch-defaulted-loans.component';

describe('BranchDefaultedLoansComponent', () => {
  let component: BranchDefaultedLoansComponent;
  let fixture: ComponentFixture<BranchDefaultedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchDefaultedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDefaultedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
