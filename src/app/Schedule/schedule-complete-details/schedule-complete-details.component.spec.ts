import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCompleteDetailsComponent } from './schedule-complete-details.component';

describe('ScheduleCompleteDetailsComponent', () => {
  let component: ScheduleCompleteDetailsComponent;
  let fixture: ComponentFixture<ScheduleCompleteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCompleteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCompleteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
