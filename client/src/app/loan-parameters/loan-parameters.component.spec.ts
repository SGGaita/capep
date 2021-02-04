import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanParametersComponent } from './loan-parameters.component';

describe('LoanParametersComponent', () => {
  let component: LoanParametersComponent;
  let fixture: ComponentFixture<LoanParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
