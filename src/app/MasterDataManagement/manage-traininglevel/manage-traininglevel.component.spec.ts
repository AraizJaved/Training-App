import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTraininglevelComponent } from './manage-traininglevel.component';

describe('ManageTraininglevelComponent', () => {
  let component: ManageTraininglevelComponent;
  let fixture: ComponentFixture<ManageTraininglevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTraininglevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTraininglevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
