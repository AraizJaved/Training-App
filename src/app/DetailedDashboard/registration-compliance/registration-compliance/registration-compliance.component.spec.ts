import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComplianceComponent } from './registration-compliance.component';

describe('RegistrationComplianceComponent', () => {
  let component: RegistrationComplianceComponent;
  let fixture: ComponentFixture<RegistrationComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
