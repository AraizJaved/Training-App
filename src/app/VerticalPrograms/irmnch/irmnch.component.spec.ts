import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IRMNCHComponent } from './irmnch.component';

describe('IRMNCHComponent', () => {
  let component: IRMNCHComponent;
  let fixture: ComponentFixture<IRMNCHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IRMNCHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IRMNCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
