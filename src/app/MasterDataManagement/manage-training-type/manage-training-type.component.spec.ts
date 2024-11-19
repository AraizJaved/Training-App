import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainingTypeComponent } from './manage-training-type.component';

describe('ManageTrainingTypeComponent', () => {
  let component: ManageTrainingTypeComponent;
  let fixture: ComponentFixture<ManageTrainingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTrainingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
