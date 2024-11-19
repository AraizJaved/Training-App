import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTypeDetailComponent } from './training-type-detail.component';

describe('TrainingTypeDetailComponent', () => {
  let component: TrainingTypeDetailComponent;
  let fixture: ComponentFixture<TrainingTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
