import { TestBed, inject } from '@angular/core/testing';

import { APIFetchService } from './apifetch.service';

describe('APIFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIFetchService]
    });
  });

  it('should be created', inject([APIFetchService], (service: APIFetchService) => {
    expect(service).toBeTruthy();
  }));
});
