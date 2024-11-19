import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentTypeComponent } from './manage-document-type.component';

describe('ManageDocumentTypeComponent', () => {
  let component: ManageDocumentTypeComponent;
  let fixture: ComponentFixture<ManageDocumentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDocumentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
