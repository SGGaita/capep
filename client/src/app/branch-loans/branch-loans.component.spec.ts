import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLoansComponent } from './branch-loans.component';

describe('BranchLoansComponent', () => {
  let component: BranchLoansComponent;
  let fixture: ComponentFixture<BranchLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
