import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMobileTeamMonitoringUCMOandAICComplianceComponent } from './comp-mobile-team-monitoring-ucmoand-aic-compliance.component';

describe('CompMobileTeamMonitoringUCMOandAICComplianceComponent', () => {
  let component: CompMobileTeamMonitoringUCMOandAICComplianceComponent;
  let fixture: ComponentFixture<CompMobileTeamMonitoringUCMOandAICComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompMobileTeamMonitoringUCMOandAICComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMobileTeamMonitoringUCMOandAICComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
