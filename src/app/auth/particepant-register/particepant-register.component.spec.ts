import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticepantRegisterComponent } from './particepant-register.component';

describe('ParticepantRegisterComponent', () => {
  let component: ParticepantRegisterComponent;
  let fixture: ComponentFixture<ParticepantRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticepantRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticepantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
