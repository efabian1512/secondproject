import { TestBed } from '@angular/core/testing';

import { UrlIdentification } from './url-identification.service';

describe('UrlIdentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlIdentification = TestBed.get(UrlIdentification);
    expect(service).toBeTruthy();
  });
});
