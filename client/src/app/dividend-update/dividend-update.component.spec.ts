import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendUpdateComponent } from './dividend-update.component';

describe('DividendUpdateComponent', () => {
  let component: DividendUpdateComponent;
  let fixture: ComponentFixture<DividendUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
