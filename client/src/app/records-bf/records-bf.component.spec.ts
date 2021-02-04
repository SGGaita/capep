import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsBfComponent } from './records-bf.component';

describe('RecordsBfComponent', () => {
  let component: RecordsBfComponent;
  let fixture: ComponentFixture<RecordsBfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsBfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsBfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
