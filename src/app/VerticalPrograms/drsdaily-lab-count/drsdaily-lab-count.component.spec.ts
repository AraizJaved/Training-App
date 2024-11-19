import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRSDailyLabCountComponent } from './drsdaily-lab-count.component';

describe('DRSDailyLabCountComponent', () => {
  let component: DRSDailyLabCountComponent;
  let fixture: ComponentFixture<DRSDailyLabCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRSDailyLabCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRSDailyLabCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
