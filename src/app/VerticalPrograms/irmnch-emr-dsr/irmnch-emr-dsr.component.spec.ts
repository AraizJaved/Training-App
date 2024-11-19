import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrmnchEmrDsrComponent } from './irmnch-emr-dsr.component';

describe('IrmnchEmrDsrComponent', () => {
  let component: IrmnchEmrDsrComponent;
  let fixture: ComponentFixture<IrmnchEmrDsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrmnchEmrDsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrmnchEmrDsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
