import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HepatitisPatientComponent } from './hepatitis-patient.component';

describe('HepatitisPatientComponent', () => {
  let component: HepatitisPatientComponent;
  let fixture: ComponentFixture<HepatitisPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HepatitisPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HepatitisPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
