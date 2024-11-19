import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingPostingComponent } from './awaiting-posting.component';

describe('AwaitingPostingComponent', () => {
  let component: AwaitingPostingComponent;
  let fixture: ComponentFixture<AwaitingPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
