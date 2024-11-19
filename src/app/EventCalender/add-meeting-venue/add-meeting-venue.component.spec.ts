import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingVenueComponent } from './add-meeting-venue.component';

describe('AddMeetingVenueComponent', () => {
  let component: AddMeetingVenueComponent;
  let fixture: ComponentFixture<AddMeetingVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingVenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
