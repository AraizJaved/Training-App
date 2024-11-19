import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDailyEngagementsComponent } from './create-daily-engagements.component';

describe('CreateDailyEngagementsComponent', () => {
  let component: CreateDailyEngagementsComponent;
  let fixture: ComponentFixture<CreateDailyEngagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDailyEngagementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDailyEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
