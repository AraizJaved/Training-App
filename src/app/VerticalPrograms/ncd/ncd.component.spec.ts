import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NCDComponent } from './ncd.component';

describe('NCDComponent', () => {
  let component: NCDComponent;
  let fixture: ComponentFixture<NCDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NCDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
