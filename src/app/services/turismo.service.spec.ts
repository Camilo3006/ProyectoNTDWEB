import { TestBed } from '@angular/core/testing';

import { TurismoService } from './turismo.service';

describe('TurismoService', () => {
  let service: TurismoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurismoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
