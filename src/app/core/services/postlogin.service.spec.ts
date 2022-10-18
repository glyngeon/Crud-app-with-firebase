import { TestBed } from '@angular/core/testing';

import { PostloginService } from './postlogin.service';

describe('PostloginService', () => {
  let service: PostloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
