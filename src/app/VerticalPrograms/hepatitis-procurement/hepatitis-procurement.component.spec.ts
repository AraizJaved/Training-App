import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HepatitisProcurementComponent } from './hepatitis-procurement.component';

describe('HepatitisProcurementComponent', () => {
  let component: HepatitisProcurementComponent;
  let fixture: ComponentFixture<HepatitisProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HepatitisProcurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HepatitisProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
