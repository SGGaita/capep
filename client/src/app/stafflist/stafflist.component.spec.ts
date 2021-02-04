import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StafflistComponent } from './stafflist.component';

describe('StafflistComponent', () => {
  let component: StafflistComponent;
  let fixture: ComponentFixture<StafflistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StafflistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StafflistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
