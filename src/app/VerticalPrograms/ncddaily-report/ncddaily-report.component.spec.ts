import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NCDDailyReportComponent } from './ncddaily-report.component';

describe('NCDDailyReportComponent', () => {
  let component: NCDDailyReportComponent;
  let fixture: ComponentFixture<NCDDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NCDDailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NCDDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
