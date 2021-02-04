import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchcreateComponent } from './branchcreate.component';

describe('BranchComponent', () => {
  let component: BranchcreateComponent;
  let fixture: ComponentFixture<BranchcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
