import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembercreateComponent } from './membercreate.component';

describe('MembercreateComponent', () => {
  let component: MembercreateComponent;
  let fixture: ComponentFixture<MembercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
