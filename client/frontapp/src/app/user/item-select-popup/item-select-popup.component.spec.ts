import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectPopupComponent } from './item-select-popup.component';

describe('ItemSelectPopupComponent', () => {
  let component: ItemSelectPopupComponent;
  let fixture: ComponentFixture<ItemSelectPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSelectPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
