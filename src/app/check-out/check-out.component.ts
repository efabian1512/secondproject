import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping = {};
  cart:ShoppingCart;
  susbcription: Subscription;
  
  constructor(
    private orderService: OrderService,
    private cartService: ShoppingCartService){}

  async ngOnInit(){
     let cart$ = await this.cartService.getCart();
     this.susbcription =cart$.subscribe(cart => this.cart = cart);
  }
  
  placeOrder() {
    let order ={
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i =>{
        return {
          product:{
             title: i.title,
             imageUrl: i.imageUrl,
             price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      
      
      } )
      };

      this.orderService.storeOrder(order);
      
  } 
  
  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }
}
