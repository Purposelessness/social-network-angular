import { TestBed } from '@angular/core/testing';

import { NewsFeedProviderService } from './news-feed-provider.service';

describe('NewsFeedProviderService', () => {
  let service: NewsFeedProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsFeedProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
