import { TestBed } from '@angular/core/testing';

describe('AppEngineApiService', () => {
  let service: AppEngineApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppEngineApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
