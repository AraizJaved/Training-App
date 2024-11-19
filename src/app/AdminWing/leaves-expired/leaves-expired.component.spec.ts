import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesExpiredComponent } from './leaves-expired.component';

describe('LeavesExpiredComponent', () => {
  let component: LeavesExpiredComponent;
  let fixture: ComponentFixture<LeavesExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
