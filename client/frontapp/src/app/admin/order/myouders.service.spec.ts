import { TestBed } from '@angular/core/testing';

import { MyoudersService } from './myouders.service';

describe('MyoudersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyoudersService = TestBed.get(MyoudersService);
    expect(service).toBeTruthy();
  });
});
