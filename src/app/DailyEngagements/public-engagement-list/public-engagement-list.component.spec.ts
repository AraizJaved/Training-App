import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEngagementListComponent } from './public-engagement-list.component';

describe('PublicEngagementListComponent', () => {
  let component: PublicEngagementListComponent;
  let fixture: ComponentFixture<PublicEngagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicEngagementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicEngagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
