import { TestBed } from '@angular/core/testing';

import { GetTagsService } from './get-tags.service';

describe('GetTagsService', () => {
  let service: GetTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
