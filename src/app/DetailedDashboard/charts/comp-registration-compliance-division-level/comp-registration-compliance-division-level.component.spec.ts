import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompRegistrationComplianceDivisionLevelComponent } from './comp-registration-compliance-division-level.component';

describe('CompRegistrationComplianceDivisionLevelComponent', () => {
  let component: CompRegistrationComplianceDivisionLevelComponent;
  let fixture: ComponentFixture<CompRegistrationComplianceDivisionLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompRegistrationComplianceDivisionLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompRegistrationComplianceDivisionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
