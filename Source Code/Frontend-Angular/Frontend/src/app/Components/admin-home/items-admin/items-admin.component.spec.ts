import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsAdminComponent } from './items-admin.component';

describe('ItemsAdminComponent', () => {
  let component: ItemsAdminComponent;
  let fixture: ComponentFixture<ItemsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
