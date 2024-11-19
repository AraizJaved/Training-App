import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExternalParticipentComponent } from './view-external-participent.component';

describe('ViewExternalParticipentComponent', () => {
  let component: ViewExternalParticipentComponent;
  let fixture: ComponentFixture<ViewExternalParticipentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExternalParticipentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExternalParticipentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
