import { TestBed } from '@angular/core/testing';

import { PaypalPaymentService } from './paypal-payment.service';

describe('PaypalPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaypalPaymentService = TestBed.get(PaypalPaymentService);
    expect(service).toBeTruthy();
  });
});
