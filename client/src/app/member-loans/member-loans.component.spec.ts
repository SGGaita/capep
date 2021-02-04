import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLoansComponent } from './member-loans.component';

describe('MemberLoansComponent', () => {
  let component: MemberLoansComponent;
  let fixture: ComponentFixture<MemberLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
