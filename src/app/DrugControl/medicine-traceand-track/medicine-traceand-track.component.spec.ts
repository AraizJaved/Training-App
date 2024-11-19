import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTraceandTrackComponent } from './medicine-traceand-track.component';

describe('MedicineTraceandTrackComponent', () => {
  let component: MedicineTraceandTrackComponent;
  let fixture: ComponentFixture<MedicineTraceandTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineTraceandTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTraceandTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
