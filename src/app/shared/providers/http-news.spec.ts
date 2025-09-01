import { TestBed } from '@angular/core/testing';

import { HttpNews } from './http-news';

describe('HttpNews', () => {
  let service: HttpNews;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpNews);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
