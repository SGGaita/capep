import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsGroupsComponent } from './savings-groups.component';

describe('SavingsGroupsComponent', () => {
  let component: SavingsGroupsComponent;
  let fixture: ComponentFixture<SavingsGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
