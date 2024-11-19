import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementDetailComponent } from './procurement-detail.component';

describe('ProcurementDetailComponent', () => {
  let component: ProcurementDetailComponent;
  let fixture: ComponentFixture<ProcurementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
