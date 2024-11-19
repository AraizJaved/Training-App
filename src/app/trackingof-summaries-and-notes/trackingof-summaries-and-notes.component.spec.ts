import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingofSummariesAndNotesComponent } from './trackingof-summaries-and-notes.component';

describe('TrackingofSummariesAndNotesComponent', () => {
  let component: TrackingofSummariesAndNotesComponent;
  let fixture: ComponentFixture<TrackingofSummariesAndNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingofSummariesAndNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingofSummariesAndNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
