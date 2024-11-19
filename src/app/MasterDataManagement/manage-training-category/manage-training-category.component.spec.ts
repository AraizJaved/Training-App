import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainingCategoryComponent } from './manage-training-category.component';

describe('ManageTrainingCategoryComponent', () => {
  let component: ManageTrainingCategoryComponent;
  let fixture: ComponentFixture<ManageTrainingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTrainingCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
