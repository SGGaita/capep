import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLoansComponent } from './group-loans.component';

describe('GroupLoansComponent', () => {
  let component: GroupLoansComponent;
  let fixture: ComponentFixture<GroupLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
