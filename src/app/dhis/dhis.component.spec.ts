import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DHISComponent } from './dhis.component';

describe('DHISComponent', () => {
  let component: DHISComponent;
  let fixture: ComponentFixture<DHISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DHISComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DHISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
