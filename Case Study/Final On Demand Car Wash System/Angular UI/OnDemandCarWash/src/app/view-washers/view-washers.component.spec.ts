import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWashersComponent } from './view-washers.component';

describe('ViewWashersComponent', () => {
  let component: ViewWashersComponent;
  let fixture: ComponentFixture<ViewWashersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWashersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWashersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
