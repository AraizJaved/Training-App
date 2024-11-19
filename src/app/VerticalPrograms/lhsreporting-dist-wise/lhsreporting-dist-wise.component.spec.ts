import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LHSReportingDistWiseComponent } from './lhsreporting-dist-wise.component';

describe('LHSReportingDistWiseComponent', () => {
  let component: LHSReportingDistWiseComponent;
  let fixture: ComponentFixture<LHSReportingDistWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LHSReportingDistWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LHSReportingDistWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
