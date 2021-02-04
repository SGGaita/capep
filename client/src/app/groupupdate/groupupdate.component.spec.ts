import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupupdateComponent } from './groupupdate.component';

describe('GroupupdateComponent', () => {
  let component: GroupupdateComponent;
  let fixture: ComponentFixture<GroupupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
