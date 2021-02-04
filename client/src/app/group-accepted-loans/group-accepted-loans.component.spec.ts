import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAcceptedLoansComponent } from './group-accepted-loans.component';

describe('GroupAcceptedLoansComponent', () => {
  let component: GroupAcceptedLoansComponent;
  let fixture: ComponentFixture<GroupAcceptedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAcceptedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAcceptedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
