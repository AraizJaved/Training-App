import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingCadreComponent } from './add-training-cadre.component';

describe('AddTrainingCadreComponent', () => {
  let component: AddTrainingCadreComponent;
  let fixture: ComponentFixture<AddTrainingCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingCadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
