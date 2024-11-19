import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchupHouseHoldCheckedComponent } from './catchup-house-hold-checked.component';

describe('CatchupHouseHoldCheckedComponent', () => {
  let component: CatchupHouseHoldCheckedComponent;
  let fixture: ComponentFixture<CatchupHouseHoldCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchupHouseHoldCheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchupHouseHoldCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
