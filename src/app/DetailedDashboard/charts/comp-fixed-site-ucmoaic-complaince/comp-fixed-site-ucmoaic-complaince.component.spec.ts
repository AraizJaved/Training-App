import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompFixedSiteUCMOAICComplainceComponent } from './comp-fixed-site-ucmoaic-complaince.component';

describe('CompFixedSiteUCMOAICComplainceComponent', () => {
  let component: CompFixedSiteUCMOAICComplainceComponent;
  let fixture: ComponentFixture<CompFixedSiteUCMOAICComplainceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompFixedSiteUCMOAICComplainceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompFixedSiteUCMOAICComplainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
