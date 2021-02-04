import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberReportDetsComponent } from './member-report-dets.component';

describe('MemberReportDetsComponent', () => {
  let component: MemberReportDetsComponent;
  let fixture: ComponentFixture<MemberReportDetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberReportDetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberReportDetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
