import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCadreComponent } from './add-cadre.component';

describe('AddCadreComponent', () => {
  let component: AddCadreComponent;
  let fixture: ComponentFixture<AddCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
