import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticepantScheduleListComponent } from './particepant-schedule-list.component';

describe('ParticepantScheduleListComponent', () => {
  let component: ParticepantScheduleListComponent;
  let fixture: ComponentFixture<ParticepantScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticepantScheduleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticepantScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
