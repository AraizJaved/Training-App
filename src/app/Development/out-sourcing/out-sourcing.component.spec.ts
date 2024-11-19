import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSourcingComponent } from './out-sourcing.component';

describe('OutSourcingComponent', () => {
  let component: OutSourcingComponent;
  let fixture: ComponentFixture<OutSourcingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutSourcingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutSourcingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
