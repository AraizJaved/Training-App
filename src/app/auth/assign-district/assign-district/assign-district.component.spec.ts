import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDistrictComponent } from './assign-district.component';

describe('AssignDistrictComponent', () => {
  let component: AssignDistrictComponent;
  let fixture: ComponentFixture<AssignDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
