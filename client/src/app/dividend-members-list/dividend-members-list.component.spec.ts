import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendMembersListComponent } from './dividend-members-list.component';

describe('DividendMembersListComponent', () => {
  let component: DividendMembersListComponent;
  let fixture: ComponentFixture<DividendMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
