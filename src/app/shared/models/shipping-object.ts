export class Shipping{
    addressLine1:string;
    addressLine2:string;
    city:string;
    name:string;

    constructor(init?: Partial<Shipping>){
         
        
        Object.assign(this,init);

       
        
    }
}