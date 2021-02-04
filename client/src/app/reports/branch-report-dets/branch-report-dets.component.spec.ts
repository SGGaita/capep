import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchReportDetsComponent } from './branch-report-dets.component';

describe('BranchReportDetsComponent', () => {
  let component: BranchReportDetsComponent;
  let fixture: ComponentFixture<BranchReportDetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchReportDetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchReportDetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
