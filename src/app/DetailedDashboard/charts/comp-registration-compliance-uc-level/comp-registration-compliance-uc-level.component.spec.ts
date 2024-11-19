import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompRegistrationComplianceUCLevelComponent } from './comp-registration-compliance-uc-level.component';

describe('CompRegistrationComplianceUCLevelComponent', () => {
  let component: CompRegistrationComplianceUCLevelComponent;
  let fixture: ComponentFixture<CompRegistrationComplianceUCLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompRegistrationComplianceUCLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompRegistrationComplianceUCLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
