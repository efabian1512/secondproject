import { PlacedProduct } from './placed-product';
import { Shipping } from './shipping-object';
import { ItemPlacedInOrder } from './item-placed-in-order';
import { PaypalShipping } from './paypal-shipping-object';
import { PaypalAddress } from './payppal-address';



export class PlacedOrder{

    private _shipping;

     private _datePlaced;

     private _key:string;
     
     private _paypalOrderId;

     orderItems: ItemPlacedInOrder[] =[];

    

    constructor(private placedOrder?,private orderId?){
        this.placedOrder = placedOrder || {};
        
       
        this._key = orderId;

       

        this._datePlaced = this.placedOrder.datePlaced;

        let shippingObject = this.placedOrder.shipping || {};

        this._paypalOrderId = this.placedOrder.paypalOrderId;

        let paypalObjectName = shippingObject.name || {};

        let paypalShippingAddress = shippingObject.address;

        let paypalShippingFullName = paypalObjectName.full_name;

        //if(paypalShippingFullName){
            this._shipping = new PaypalShipping(new PaypalAddress({...paypalShippingAddress}),paypalShippingFullName);
        //}else{
            //this._shipping = new Shipping({...shippingObject});
        //}

       

        let items = this.placedOrder.items || {};

        for(let item in items){
            
            let itm = items[item];

            

            this.orderItems.push(new ItemPlacedInOrder(new PlacedProduct({...itm.product}),itm.quantity,itm.totalPrice));


        }
        
        
    }

    get paypalOrderId(){
        return this._paypalOrderId;
    }

    get key(){
     
         return this._key;
    }

   
    get totalPrice(){
        let items = this.placedOrder.items || {};
        let total =0;
        for(let item in items){

            total += items[item].totalPrice;

        }

        return total;

        
    }

    get datePlaced(){
        return this._datePlaced;
    }

    get shipping(){
        return this._shipping;
    }

}