import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendCreateComponent } from './dividend-create.component';

describe('DividendCreateComponent', () => {
  let component: DividendCreateComponent;
  let fixture: ComponentFixture<DividendCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
