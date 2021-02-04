import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupReportComponent } from './group-report.component';

describe('GroupReportComponent', () => {
  let component: GroupReportComponent;
  let fixture: ComponentFixture<GroupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
