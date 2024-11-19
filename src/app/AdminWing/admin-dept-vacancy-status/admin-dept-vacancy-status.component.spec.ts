import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeptVacancyStatusComponent } from './admin-dept-vacancy-status.component';

describe('AdminDeptVacancyStatusComponent', () => {
  let component: AdminDeptVacancyStatusComponent;
  let fixture: ComponentFixture<AdminDeptVacancyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeptVacancyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeptVacancyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
