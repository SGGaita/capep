import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingscreateComponent } from './savingscreate.component';

describe('SavingscreateComponent', () => {
  let component: SavingscreateComponent;
  let fixture: ComponentFixture<SavingscreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingscreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
