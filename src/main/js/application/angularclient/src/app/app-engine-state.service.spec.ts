import { TestBed } from '@angular/core/testing';

import { AppEngineStateService } from './app-engine-state.service';

describe('AppEngineStateService', () => {
  let service: AppEngineStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppEngineStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
