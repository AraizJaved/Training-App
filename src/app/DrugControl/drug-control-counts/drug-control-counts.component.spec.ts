import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugControlCountsComponent } from './drug-control-counts.component';

describe('DrugControlCountsComponent', () => {
  let component: DrugControlCountsComponent;
  let fixture: ComponentFixture<DrugControlCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugControlCountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugControlCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
