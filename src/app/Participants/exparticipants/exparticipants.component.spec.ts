import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExparticipantsComponent } from './exparticipants.component';

describe('ExparticipantsComponent', () => {
  let component: ExparticipantsComponent;
  let fixture: ComponentFixture<ExparticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExparticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExparticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
