import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRateslistComponent } from './loan-rateslist.component';

describe('LoanRateslistComponent', () => {
  let component: LoanRateslistComponent;
  let fixture: ComponentFixture<LoanRateslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRateslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRateslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
