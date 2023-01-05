import { TestBed } from '@angular/core/testing';

import { UpdateListServiceService } from './update-list-service.service';

describe('UpdateListServiceService', () => {
  let service: UpdateListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
