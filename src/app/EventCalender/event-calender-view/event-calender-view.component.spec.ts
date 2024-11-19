import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalenderViewComponent } from './event-calender-view.component';

describe('EventCalenderViewComponent', () => {
  let component: EventCalenderViewComponent;
  let fixture: ComponentFixture<EventCalenderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCalenderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalenderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
