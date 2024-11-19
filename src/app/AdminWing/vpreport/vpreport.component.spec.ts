import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPReportComponent } from './vpreport.component';

describe('VPReportComponent', () => {
  let component: VPReportComponent;
  let fixture: ComponentFixture<VPReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VPReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VPReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
