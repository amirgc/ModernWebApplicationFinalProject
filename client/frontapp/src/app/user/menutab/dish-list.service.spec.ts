import { TestBed } from '@angular/core/testing';

import { DishListService } from './dish-list.service';

describe('DishListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DishListService = TestBed.get(DishListService);
    expect(service).toBeTruthy();
  });
});
