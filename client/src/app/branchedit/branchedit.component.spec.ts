import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheditComponent } from './branchedit.component';

describe('BrancheditComponent', () => {
  let component: BrancheditComponent;
  let fixture: ComponentFixture<BrancheditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrancheditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrancheditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
