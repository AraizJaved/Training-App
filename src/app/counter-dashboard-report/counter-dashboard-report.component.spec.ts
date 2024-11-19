import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDashboardReportComponent } from './counter-dashboard-report.component';

describe('CounterDashboardReportComponent', () => {
  let component: CounterDashboardReportComponent;
  let fixture: ComponentFixture<CounterDashboardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterDashboardReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterDashboardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
