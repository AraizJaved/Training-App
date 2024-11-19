import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalProgramsComponent } from './vertical-programs.component';

describe('VerticalProgramsComponent', () => {
  let component: VerticalProgramsComponent;
  let fixture: ComponentFixture<VerticalProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
