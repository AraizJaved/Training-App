import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyStatusDevelopmentComponent } from './vacancy-status-development.component';

describe('VacancyStatusDevelopmentComponent', () => {
  let component: VacancyStatusDevelopmentComponent;
  let fixture: ComponentFixture<VacancyStatusDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancyStatusDevelopmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyStatusDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
