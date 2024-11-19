import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWingChartsComponent } from './admin-wing-charts.component';

describe('AdminWingChartsComponent', () => {
  let component: AdminWingChartsComponent;
  let fixture: ComponentFixture<AdminWingChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWingChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
