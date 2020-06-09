import { TestBed } from '@angular/core/testing';

import { AppEngineLoanCookieService } from './app-engine-loan-cookie.service';

describe('AppEngineLoanCookieService', () => {
  let service: AppEngineLoanCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppEngineLoanCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
