import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanGroupsComponent } from './loan-groups.component';

describe('LoanGroupsComponent', () => {
  let component: LoanGroupsComponent;
  let fixture: ComponentFixture<LoanGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
