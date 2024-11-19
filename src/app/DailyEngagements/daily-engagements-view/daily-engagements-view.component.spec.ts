import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEngagementsViewComponent } from './daily-engagements-view.component';

describe('DailyEngagementsViewComponent', () => {
  let component: DailyEngagementsViewComponent;
  let fixture: ComponentFixture<DailyEngagementsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyEngagementsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEngagementsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
