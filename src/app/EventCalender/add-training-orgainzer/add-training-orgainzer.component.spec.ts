import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingOrgainzerComponent } from './add-training-orgainzer.component';

describe('AddTrainingOrgainzerComponent', () => {
  let component: AddTrainingOrgainzerComponent;
  let fixture: ComponentFixture<AddTrainingOrgainzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingOrgainzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingOrgainzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
