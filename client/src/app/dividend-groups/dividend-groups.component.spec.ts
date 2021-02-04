import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendGroupsComponent } from './dividend-groups.component';

describe('DividendGroupsComponent', () => {
  let component: DividendGroupsComponent;
  let fixture: ComponentFixture<DividendGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
