import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactTypeComponent } from './add-contact-type.component';

describe('AddContactTypeComponent', () => {
  let component: AddContactTypeComponent;
  let fixture: ComponentFixture<AddContactTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
