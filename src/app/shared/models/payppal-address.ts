export class PaypalAddress{
    address_line_1: string;
    admin_area_1: string;
    admin_area_2: string;
    country_code: string;
    postal_code: string;

    constructor(init?: Partial<PaypalAddress>){
          Object.assign(this,init);
    }
}