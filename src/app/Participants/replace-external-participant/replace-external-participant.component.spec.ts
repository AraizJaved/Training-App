import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceExternalParticipantComponent } from './replace-external-participant.component';

describe('ReplaceExternalParticipantComponent', () => {
  let component: ReplaceExternalParticipantComponent;
  let fixture: ComponentFixture<ReplaceExternalParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceExternalParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceExternalParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
