import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTrainingListComponent } from './schedule-training-list.component';

describe('ScheduleTrainingListComponent', () => {
  let component: ScheduleTrainingListComponent;
  let fixture: ComponentFixture<ScheduleTrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleTrainingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
