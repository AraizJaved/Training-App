import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsIndicatorListComponent } from './forms-indicator-list.component';

describe('FormsIndicatorListComponent', () => {
  let component: FormsIndicatorListComponent;
  let fixture: ComponentFixture<FormsIndicatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsIndicatorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsIndicatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
