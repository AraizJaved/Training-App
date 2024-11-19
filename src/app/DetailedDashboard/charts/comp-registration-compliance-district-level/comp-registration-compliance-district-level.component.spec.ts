import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompRegistrationComplianceDistrictLevelComponent } from './comp-registration-compliance-district-level.component';

describe('CompRegistrationComplianceDistrictLevelComponent', () => {
  let component: CompRegistrationComplianceDistrictLevelComponent;
  let fixture: ComponentFixture<CompRegistrationComplianceDistrictLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompRegistrationComplianceDistrictLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompRegistrationComplianceDistrictLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
