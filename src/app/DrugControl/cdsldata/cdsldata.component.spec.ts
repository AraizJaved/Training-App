import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDSLDataComponent } from './cdsldata.component';

describe('CDSLDataComponent', () => {
  let component: CDSLDataComponent;
  let fixture: ComponentFixture<CDSLDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDSLDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDSLDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
