import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  shoppingCart ={};
 
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {

    let cart$ = await this.cartService.getCart();

    cart$.pipe(take(1)).subscribe(cart => this.shoppingCart = cart);

    
  }

}
