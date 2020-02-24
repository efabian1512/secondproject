
import { PaypalAddress } from './payppal-address';

export class PaypalShipping{

    address: PaypalAddress;
    name: string;

    constructor(address,name:string){
 
         this.address = address;
         this.name = name;
    }

}