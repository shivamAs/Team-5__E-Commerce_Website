import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNowComponent } from './reset-now.component';

describe('ResetNowComponent', () => {
  let component: ResetNowComponent;
  let fixture: ComponentFixture<ResetNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
