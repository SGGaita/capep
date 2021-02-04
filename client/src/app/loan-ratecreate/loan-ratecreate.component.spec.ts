import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRatecreateComponent } from './loan-ratecreate.component';

describe('LoanRatecreateComponent', () => {
  let component: LoanRatecreateComponent;
  let fixture: ComponentFixture<LoanRatecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRatecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRatecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
