import { TestBed } from '@angular/core/testing';

import { SlideContentService } from './slide-content.service';

describe('SlideContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlideContentService = TestBed.get(SlideContentService);
    expect(service).toBeTruthy();
  });
});
