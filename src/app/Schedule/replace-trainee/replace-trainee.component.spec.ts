import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceTraineeComponent } from './replace-trainee.component';

describe('ReplaceTraineeComponent', () => {
  let component: ReplaceTraineeComponent;
  let fixture: ComponentFixture<ReplaceTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
