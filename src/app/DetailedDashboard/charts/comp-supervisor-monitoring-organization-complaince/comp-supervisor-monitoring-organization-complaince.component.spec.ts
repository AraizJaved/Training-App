import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSupervisorMonitoringOrganizationComplainceComponent } from './comp-supervisor-monitoring-organization-complaince.component';

describe('CompSupervisorMonitoringOrganizationComplainceComponent', () => {
  let component: CompSupervisorMonitoringOrganizationComplainceComponent;
  let fixture: ComponentFixture<CompSupervisorMonitoringOrganizationComplainceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompSupervisorMonitoringOrganizationComplainceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSupervisorMonitoringOrganizationComplainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
