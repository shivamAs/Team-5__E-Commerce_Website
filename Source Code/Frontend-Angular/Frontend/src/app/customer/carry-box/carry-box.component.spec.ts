import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarryBoxComponent } from './carry-box.component';

describe('CarryBoxComponent', () => {
  let component: CarryBoxComponent;
  let fixture: ComponentFixture<CarryBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarryBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
