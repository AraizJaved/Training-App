import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NCDDeskReportComponent } from './ncddesk-report.component';

describe('NCDDeskReportComponent', () => {
  let component: NCDDeskReportComponent;
  let fixture: ComponentFixture<NCDDeskReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NCDDeskReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NCDDeskReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
