import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchupHouseHoldFindingsComponent } from './catchup-house-hold-findings.component';

describe('CatchupHouseHoldFindingsComponent', () => {
  let component: CatchupHouseHoldFindingsComponent;
  let fixture: ComponentFixture<CatchupHouseHoldFindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchupHouseHoldFindingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchupHouseHoldFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
