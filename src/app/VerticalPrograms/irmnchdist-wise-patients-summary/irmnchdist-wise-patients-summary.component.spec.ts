import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IRMNCHDistWisePatientsSummaryComponent } from './irmnchdist-wise-patients-summary.component';

describe('IRMNCHDistWisePatientsSummaryComponent', () => {
  let component: IRMNCHDistWisePatientsSummaryComponent;
  let fixture: ComponentFixture<IRMNCHDistWisePatientsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IRMNCHDistWisePatientsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IRMNCHDistWisePatientsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
