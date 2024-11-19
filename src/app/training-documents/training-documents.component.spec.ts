import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDocumentsComponent } from './training-documents.component';

describe('TrainingDocumentsComponent', () => {
  let component: TrainingDocumentsComponent;
  let fixture: ComponentFixture<TrainingDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
