import { PlacedProduct } from './placed-product';
import { Shipping } from './shipping-object';
import { ItemPlacedInOrder } from './item-placed-in-order';



export class PlacedOrder{

    private _shipping: Shipping;

     private _datePlaced;
     
     orderItems: ItemPlacedInOrder[] =[];

    constructor(private placedOrder?){
        this.placedOrder = placedOrder || {};
        
        this._datePlaced = this.placedOrder.datePlaced;

        let shippingObject = this.placedOrder.shipping;
        
        this._shipping = new Shipping({...shippingObject});

        let items = this.placedOrder.items || {};

        for(let item in items){
            
            let itm = items[item];

            

            this.orderItems.push(new ItemPlacedInOrder(new PlacedProduct({...itm.product}),itm.quantity,itm.totalPrice));


        }
        
        
    }



    get datePlaced(){
        return this._datePlaced;
    }

    get shipping(){
        return this._shipping;
    }

}