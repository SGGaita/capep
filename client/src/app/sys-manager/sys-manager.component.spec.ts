import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysManagerComponent } from './sys-manager.component';

describe('SysManagerComponent', () => {
  let component: SysManagerComponent;
  let fixture: ComponentFixture<SysManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
