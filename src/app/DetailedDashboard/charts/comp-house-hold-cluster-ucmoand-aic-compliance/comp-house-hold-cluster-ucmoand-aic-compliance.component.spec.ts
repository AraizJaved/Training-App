import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompHouseHoldClusterUCMOandAICComplianceComponent } from './comp-house-hold-cluster-ucmoand-aic-compliance.component';

describe('CompHouseHoldClusterUCMOandAICComplianceComponent', () => {
  let component: CompHouseHoldClusterUCMOandAICComplianceComponent;
  let fixture: ComponentFixture<CompHouseHoldClusterUCMOandAICComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompHouseHoldClusterUCMOandAICComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompHouseHoldClusterUCMOandAICComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
