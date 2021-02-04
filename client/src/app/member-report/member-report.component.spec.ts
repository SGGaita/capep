import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberReportComponent } from './member-report.component';

describe('MemberReportComponent', () => {
  let component: MemberReportComponent;
  let fixture: ComponentFixture<MemberReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
