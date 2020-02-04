import { TestBed } from '@angular/core/testing';

import { AdminOrdersSourceGuard } from './admin-orders-source-guard.service';

describe('AdminOrdersSourceGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminOrdersSourceGuard = TestBed.get(AdminOrdersSourceGuard);
    expect(service).toBeTruthy();
  });
});
