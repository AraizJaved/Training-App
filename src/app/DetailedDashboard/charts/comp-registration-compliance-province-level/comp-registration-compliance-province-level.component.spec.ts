import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompRegistrationComplianceProvinceLevelComponent } from './comp-registration-compliance-province-level.component';

describe('CompRegistrationComplianceProvinceLevelComponent', () => {
  let component: CompRegistrationComplianceProvinceLevelComponent;
  let fixture: ComponentFixture<CompRegistrationComplianceProvinceLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompRegistrationComplianceProvinceLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompRegistrationComplianceProvinceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
