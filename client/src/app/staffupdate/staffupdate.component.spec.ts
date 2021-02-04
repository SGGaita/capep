import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffupdateComponent } from './staffupdate.component';

describe('StaffupdateComponent', () => {
  let component: StaffupdateComponent;
  let fixture: ComponentFixture<StaffupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
