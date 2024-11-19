import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpSchemesComponent } from './adp-schemes.component';

describe('AdpSchemesComponent', () => {
  let component: AdpSchemesComponent;
  let fixture: ComponentFixture<AdpSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdpSchemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
