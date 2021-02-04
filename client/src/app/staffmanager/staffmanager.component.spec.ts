import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffmanagerComponent } from './staffmanager.component';

describe('StaffmanagerComponent', () => {
  let component: StaffmanagerComponent;
  let fixture: ComponentFixture<StaffmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
