import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDefaultedLoansComponent } from './group-defaulted-loans.component';

describe('GroupDefaultedLoansComponent', () => {
  let component: GroupDefaultedLoansComponent;
  let fixture: ComponentFixture<GroupDefaultedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDefaultedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDefaultedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
