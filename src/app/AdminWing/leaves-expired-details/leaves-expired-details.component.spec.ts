import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesExpiredDetailsComponent } from './leaves-expired-details.component';

describe('LeavesExpiredDetailsComponent', () => {
  let component: LeavesExpiredDetailsComponent;
  let fixture: ComponentFixture<LeavesExpiredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesExpiredDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesExpiredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
