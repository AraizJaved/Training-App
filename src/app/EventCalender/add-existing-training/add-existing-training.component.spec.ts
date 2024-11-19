import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingTrainingComponent } from './add-existing-training.component';

describe('AddExistingTrainingComponent', () => {
  let component: AddExistingTrainingComponent;
  let fixture: ComponentFixture<AddExistingTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExistingTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
