import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbProcurementComponent } from './tb-procurement.component';

describe('TbProcurementComponent', () => {
  let component: TbProcurementComponent;
  let fixture: ComponentFixture<TbProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbProcurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
