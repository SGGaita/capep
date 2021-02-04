import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupReportDetsComponent } from './group-report-dets.component';

describe('GroupReportDetsComponent', () => {
  let component: GroupReportDetsComponent;
  let fixture: ComponentFixture<GroupReportDetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupReportDetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupReportDetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
