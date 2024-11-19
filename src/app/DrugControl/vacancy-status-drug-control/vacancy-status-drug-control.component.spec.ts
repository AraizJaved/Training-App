import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyStatusDrugControlComponent } from './vacancy-status-drug-control.component';

describe('VacancyStatusDrugControlComponent', () => {
  let component: VacancyStatusDrugControlComponent;
  let fixture: ComponentFixture<VacancyStatusDrugControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancyStatusDrugControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyStatusDrugControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
