import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcdProcurementComponent } from './ncd-procurement.component';

describe('NcdProcurementComponent', () => {
  let component: NcdProcurementComponent;
  let fixture: ComponentFixture<NcdProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcdProcurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcdProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
