import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSupportedByComponent } from './training-supported-by.component';

describe('TrainingSupportedByComponent', () => {
  let component: TrainingSupportedByComponent;
  let fixture: ComponentFixture<TrainingSupportedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingSupportedByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSupportedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
