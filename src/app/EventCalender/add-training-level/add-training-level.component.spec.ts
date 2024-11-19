import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingLevelComponent } from './add-training-level.component';

describe('AddTrainingLevelComponent', () => {
  let component: AddTrainingLevelComponent;
  let fixture: ComponentFixture<AddTrainingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
