import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchlistComponent } from './branchlist.component';

describe('BranchlistComponent', () => {
  let component: BranchlistComponent;
  let fixture: ComponentFixture<BranchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
