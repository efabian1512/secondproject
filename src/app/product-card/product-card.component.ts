import { Products } from './../models/products';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Products;
  @Input('showActions') showActions=true;
  @Input('shopping-cart') shoppingCart;
  

  constructor(private cartService: ShoppingCartService) {}

 
  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
  getQuantity(){

    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart.itemsMap[this.product.key];

    return item ? item.quantity : 0;

    }
      


}
