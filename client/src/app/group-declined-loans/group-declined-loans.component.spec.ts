import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDeclinedLoansComponent } from './group-declined-loans.component';

describe('GroupDeclinedLoansComponent', () => {
  let component: GroupDeclinedLoansComponent;
  let fixture: ComponentFixture<GroupDeclinedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDeclinedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDeclinedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
