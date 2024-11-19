import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidsProcurementComponent } from './aids-procurement.component';

describe('AidsProcurementComponent', () => {
  let component: AidsProcurementComponent;
  let fixture: ComponentFixture<AidsProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidsProcurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AidsProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
