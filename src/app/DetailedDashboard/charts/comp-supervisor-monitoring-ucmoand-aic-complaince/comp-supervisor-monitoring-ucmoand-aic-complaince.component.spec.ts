import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSupervisorMonitoringUCMOandAICComplainceComponent } from './comp-supervisor-monitoring-ucmoand-aic-complaince.component';

describe('CompSupervisorMonitoringUCMOandAICComplainceComponent', () => {
  let component: CompSupervisorMonitoringUCMOandAICComplainceComponent;
  let fixture: ComponentFixture<CompSupervisorMonitoringUCMOandAICComplainceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompSupervisorMonitoringUCMOandAICComplainceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSupervisorMonitoringUCMOandAICComplainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
