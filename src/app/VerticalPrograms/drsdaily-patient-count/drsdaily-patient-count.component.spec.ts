import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRSDailyPatientCountComponent } from './drsdaily-patient-count.component';

describe('DRSDailyPatientCountComponent', () => {
  let component: DRSDailyPatientCountComponent;
  let fixture: ComponentFixture<DRSDailyPatientCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRSDailyPatientCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRSDailyPatientCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
