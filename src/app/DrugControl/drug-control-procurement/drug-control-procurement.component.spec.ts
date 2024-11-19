import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugControlProcurementComponent } from './drug-control-procurement.component';

describe('DrugControlProcurementComponent', () => {
  let component: DrugControlProcurementComponent;
  let fixture: ComponentFixture<DrugControlProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugControlProcurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugControlProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
