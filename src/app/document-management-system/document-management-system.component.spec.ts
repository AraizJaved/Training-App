import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagementSystemComponent } from './document-management-system.component';

describe('DocumentManagementSystemComponent', () => {
  let component: DocumentManagementSystemComponent;
  let fixture: ComponentFixture<DocumentManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentManagementSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
