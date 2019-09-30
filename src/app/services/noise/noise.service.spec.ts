import { TestBed } from '@angular/core/testing';

import { NoiseService } from './noise.service';

describe('NoiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoiseService = TestBed.get(NoiseService);
    expect(service).toBeTruthy();
  });
});
