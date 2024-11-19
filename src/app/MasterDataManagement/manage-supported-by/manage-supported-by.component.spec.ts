import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupportedByComponent } from './manage-supported-by.component';

describe('ManageSupportedByComponent', () => {
  let component: ManageSupportedByComponent;
  let fixture: ComponentFixture<ManageSupportedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSupportedByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSupportedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
