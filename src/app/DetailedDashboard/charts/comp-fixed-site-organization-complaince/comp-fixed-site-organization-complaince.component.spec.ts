import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompFixedSiteOrganizationComplainceComponent } from './comp-fixed-site-organization-complaince.component';

describe('CompFixedSiteOrganizationComplainceComponent', () => {
  let component: CompFixedSiteOrganizationComplainceComponent;
  let fixture: ComponentFixture<CompFixedSiteOrganizationComplainceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompFixedSiteOrganizationComplainceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompFixedSiteOrganizationComplainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
