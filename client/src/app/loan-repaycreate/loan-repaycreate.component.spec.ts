import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaycreateComponent } from './loan-repaycreate.component';

describe('LoanRepaycreateComponent', () => {
  let component: LoanRepaycreateComponent;
  let fixture: ComponentFixture<LoanRepaycreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaycreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
