import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRRSummaryComponent } from './crrsummary.component';

describe('CRRSummaryComponent', () => {
  let component: CRRSummaryComponent;
  let fixture: ComponentFixture<CRRSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRRSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRRSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
