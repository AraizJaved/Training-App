import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDigitizedTrainingDataComponent } from './non-digitized-training-data.component';

describe('NonDigitizedTrainingDataComponent', () => {
  let component: NonDigitizedTrainingDataComponent;
  let fixture: ComponentFixture<NonDigitizedTrainingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonDigitizedTrainingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonDigitizedTrainingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
