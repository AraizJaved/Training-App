import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyEngagementsComponent } from './update-daily-engagements.component';

describe('UpdateDailyEngagementsComponent', () => {
  let component: UpdateDailyEngagementsComponent;
  let fixture: ComponentFixture<UpdateDailyEngagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDailyEngagementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDailyEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
