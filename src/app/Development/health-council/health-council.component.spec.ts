import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCouncilComponent } from './health-council.component';

describe('HealthCouncilComponent', () => {
  let component: HealthCouncilComponent;
  let fixture: ComponentFixture<HealthCouncilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthCouncilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
