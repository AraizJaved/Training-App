import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictCountComponent } from './district-count.component';

describe('DistrictCountComponent', () => {
  let component: DistrictCountComponent;
  let fixture: ComponentFixture<DistrictCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
