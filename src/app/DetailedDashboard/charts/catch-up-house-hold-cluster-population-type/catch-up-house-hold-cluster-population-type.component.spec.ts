import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchUpHouseHoldClusterPopulationTypeComponent } from './catch-up-house-hold-cluster-population-type.component';

describe('CatchUpHouseHoldClusterPopulationTypeComponent', () => {
  let component: CatchUpHouseHoldClusterPopulationTypeComponent;
  let fixture: ComponentFixture<CatchUpHouseHoldClusterPopulationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchUpHouseHoldClusterPopulationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchUpHouseHoldClusterPopulationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
