import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingScheduleComponent } from './add-training-schedule.component';

describe('AddTrainingScheduleComponent', () => {
  let component: AddTrainingScheduleComponent;
  let fixture: ComponentFixture<AddTrainingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
