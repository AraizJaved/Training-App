import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduleDetailsComponent } from './view-schedule-details.component';

describe('ViewScheduleDetailsComponent', () => {
  let component: ViewScheduleDetailsComponent;
  let fixture: ComponentFixture<ViewScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScheduleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
