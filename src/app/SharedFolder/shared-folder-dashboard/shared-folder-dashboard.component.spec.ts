import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFolderDashboardComponent } from './shared-folder-dashboard.component';

describe('SharedFolderDashboardComponent', () => {
  let component: SharedFolderDashboardComponent;
  let fixture: ComponentFixture<SharedFolderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFolderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFolderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
