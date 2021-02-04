import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansmanagerComponent } from './loansmanager.component';

describe('LoansmanagerComponent', () => {
  let component: LoansmanagerComponent;
  let fixture: ComponentFixture<LoansmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoansmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
