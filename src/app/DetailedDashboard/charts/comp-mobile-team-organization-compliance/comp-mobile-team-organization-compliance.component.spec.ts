import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMobileTeamOrganizationComplianceComponent } from './comp-mobile-team-organization-compliance.component';

describe('CompMobileTeamOrganizationComplianceComponent', () => {
  let component: CompMobileTeamOrganizationComplianceComponent;
  let fixture: ComponentFixture<CompMobileTeamOrganizationComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompMobileTeamOrganizationComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMobileTeamOrganizationComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
