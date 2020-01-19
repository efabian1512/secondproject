import { Products } from './products';

export class ShoppingCartItem{

    

    constructor(public product: Products, public quantity  ){}

    get totalPrice(){
        return this.product.price * this.quantity;
    }
}