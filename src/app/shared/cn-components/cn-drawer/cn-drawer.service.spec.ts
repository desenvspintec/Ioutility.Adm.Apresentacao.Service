import { TestBed } from '@angular/core/testing';

import { CnDrawerService } from './cn-drawer.service';

describe('CnDrawerService', () => {
  let service: CnDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
