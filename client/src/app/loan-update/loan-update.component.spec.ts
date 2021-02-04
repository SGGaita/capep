import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanUpdateComponent } from './loan-update.component';

describe('LoanUpdateComponent', () => {
  let component: LoanUpdateComponent;
  let fixture: ComponentFixture<LoanUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
