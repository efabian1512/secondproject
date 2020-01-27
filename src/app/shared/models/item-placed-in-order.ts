import { PlacedProduct } from './placed-product';


export class ItemPlacedInOrder{
    product: PlacedProduct;
    quantity: number;
    totalPrice: number;

    constructor(product,quantity,totalPrice){

        this.product = product;
        this.quantity = quantity;
        this.totalPrice = totalPrice;

    }
}