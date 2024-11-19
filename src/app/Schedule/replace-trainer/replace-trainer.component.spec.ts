import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceTrainerComponent } from './replace-trainer.component';

describe('ReplaceTrainerComponent', () => {
  let component: ReplaceTrainerComponent;
  let fixture: ComponentFixture<ReplaceTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
