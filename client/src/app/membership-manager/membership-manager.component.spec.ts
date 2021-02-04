import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipManagerComponent } from './membership-manager.component';

describe('MembershipManagerComponent', () => {
  let component: MembershipManagerComponent;
  let fixture: ComponentFixture<MembershipManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
