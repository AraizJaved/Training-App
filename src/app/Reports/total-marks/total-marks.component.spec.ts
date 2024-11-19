import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMarksComponent } from './total-marks.component';

describe('TotalMarksComponent', () => {
  let component: TotalMarksComponent;
  let fixture: ComponentFixture<TotalMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
