import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganizedByComponent } from './manage-organized-by.component';

describe('ManageOrganizedByComponent', () => {
  let component: ManageOrganizedByComponent;
  let fixture: ComponentFixture<ManageOrganizedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOrganizedByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrganizedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
