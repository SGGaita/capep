import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateHeaderComponent } from './admin-create-header.component';

describe('AdminCreateHeaderComponent', () => {
  let component: AdminCreateHeaderComponent;
  let fixture: ComponentFixture<AdminCreateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
