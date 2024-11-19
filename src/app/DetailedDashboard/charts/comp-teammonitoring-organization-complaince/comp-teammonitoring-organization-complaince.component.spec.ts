import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTeammonitoringOrganizationComplainceComponent } from './comp-teammonitoring-organization-complaince.component';

describe('CompTeammonitoringOrganizationComplainceComponent', () => {
  let component: CompTeammonitoringOrganizationComplainceComponent;
  let fixture: ComponentFixture<CompTeammonitoringOrganizationComplainceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompTeammonitoringOrganizationComplainceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompTeammonitoringOrganizationComplainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
