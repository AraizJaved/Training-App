import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalParticipantComponent } from './external-participant.component';

describe('ExternalParticipantComponent', () => {
  let component: ExternalParticipantComponent;
  let fixture: ComponentFixture<ExternalParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
