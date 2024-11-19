import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTeammonitoringUCMOandAICComplainceComponent } from './comp-teammonitoring-ucmoand-aic-complaince.component';

describe('CompTeammonitoringUCMOandAICComplainceComponent', () => {
  let component: CompTeammonitoringUCMOandAICComplainceComponent;
  let fixture: ComponentFixture<CompTeammonitoringUCMOandAICComplainceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompTeammonitoringUCMOandAICComplainceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompTeammonitoringUCMOandAICComplainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
