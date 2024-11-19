import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalParticepantDropDownComponent } from './external-particepant-drop-down.component';

describe('ExternalParticepantDropDownComponent', () => {
  let component: ExternalParticepantDropDownComponent;
  let fixture: ComponentFixture<ExternalParticepantDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalParticepantDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalParticepantDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
