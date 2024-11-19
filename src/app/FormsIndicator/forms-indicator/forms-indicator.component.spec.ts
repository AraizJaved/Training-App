import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsIndicatorComponent } from './forms-indicator.component';

describe('FormsIndicatorComponent', () => {
  let component: FormsIndicatorComponent;
  let fixture: ComponentFixture<FormsIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
