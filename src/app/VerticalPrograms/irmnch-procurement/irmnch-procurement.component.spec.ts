import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrmnchProcurementComponent } from './irmnch-procurement.component';

describe('IrmnchProcurementComponent', () => {
  let component: IrmnchProcurementComponent;
  let fixture: ComponentFixture<IrmnchProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrmnchProcurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrmnchProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
