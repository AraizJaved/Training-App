import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingOrganizerComponent } from './add-meeting-organizer.component';

describe('AddMeetingOrganizerComponent', () => {
  let component: AddMeetingOrganizerComponent;
  let fixture: ComponentFixture<AddMeetingOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingOrganizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
