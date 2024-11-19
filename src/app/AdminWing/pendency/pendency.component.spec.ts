import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendencyComponent } from './pendency.component';

describe('PendencyComponent', () => {
  let component: PendencyComponent;
  let fixture: ComponentFixture<PendencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
