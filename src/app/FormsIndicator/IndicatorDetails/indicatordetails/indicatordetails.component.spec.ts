import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatordetailsComponent } from './indicatordetails.component';

describe('IndicatordetailsComponent', () => {
  let component: IndicatordetailsComponent;
  let fixture: ComponentFixture<IndicatordetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatordetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
