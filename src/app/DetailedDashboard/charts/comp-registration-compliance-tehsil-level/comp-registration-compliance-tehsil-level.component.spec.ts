import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompRegistrationComplianceTehsilLevelComponent } from './comp-registration-compliance-tehsil-level.component';

describe('CompRegistrationComplianceTehsilLevelComponent', () => {
  let component: CompRegistrationComplianceTehsilLevelComponent;
  let fixture: ComponentFixture<CompRegistrationComplianceTehsilLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompRegistrationComplianceTehsilLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompRegistrationComplianceTehsilLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
