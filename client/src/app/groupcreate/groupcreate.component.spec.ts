import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcreateComponent } from './groupcreate.component';

describe('GroupcreateComponent', () => {
  let component: GroupcreateComponent;
  let fixture: ComponentFixture<GroupcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
