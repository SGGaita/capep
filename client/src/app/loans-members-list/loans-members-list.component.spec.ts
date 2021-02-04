import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansMembersListComponent } from './loans-members-list.component';

describe('LoansMembersListComponent', () => {
  let component: LoansMembersListComponent;
  let fixture: ComponentFixture<LoansMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoansMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
