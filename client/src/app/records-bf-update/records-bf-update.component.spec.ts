import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsBfUpdateComponent } from './records-bf-update.component';

describe('RecordsBfUpdateComponent', () => {
  let component: RecordsBfUpdateComponent;
  let fixture: ComponentFixture<RecordsBfUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsBfUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsBfUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
