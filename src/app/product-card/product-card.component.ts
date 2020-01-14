import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product;
  @Input('showActions') showActions=true;
  

  constructor(private cartService: ShoppingCartService) { }

 
  addToCart(product){}
      


}
