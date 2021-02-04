import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNewLoansComponent } from './group-new-loans.component';

describe('GroupNewLoansComponent', () => {
  let component: GroupNewLoansComponent;
  let fixture: ComponentFixture<GroupNewLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNewLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNewLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
