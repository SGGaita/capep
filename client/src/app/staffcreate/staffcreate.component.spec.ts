import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffcreateComponent } from './staffcreate.component';

describe('StaffcreateComponent', () => {
  let component: StaffcreateComponent;
  let fixture: ComponentFixture<StaffcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
