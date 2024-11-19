import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompHouseHoldOrganizationComplianceComponent } from './comp-house-hold-organization-compliance.component';

describe('CompHouseHoldOrganizationComplianceComponent', () => {
  let component: CompHouseHoldOrganizationComplianceComponent;
  let fixture: ComponentFixture<CompHouseHoldOrganizationComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompHouseHoldOrganizationComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompHouseHoldOrganizationComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
