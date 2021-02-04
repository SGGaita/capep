import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsMembersListComponent } from './savings-members-list.component';

describe('SavingsMembersListComponent', () => {
  let component: SavingsMembersListComponent;
  let fixture: ComponentFixture<SavingsMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
