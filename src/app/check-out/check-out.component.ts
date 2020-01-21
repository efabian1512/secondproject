import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping = {};
  cart:ShoppingCart;
  cartSusbcription: Subscription;
  userSusbcription: Subscription;
  userId;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService){}

  async ngOnInit(){
     let cart$ = await this.cartService.getCart();
     this.cartSusbcription = cart$.subscribe(cart => this.cart = cart);
     this.userSusbcription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  async placeOrder() {
      let order = new Order(this.userId,this.shipping,this.cart);
      let result = await this.orderService.storeOrder(order);
      this.router.navigate(['/order-success',result.key])
    } 
  
  ngOnDestroy(){
    this.cartSusbcription.unsubscribe();
    this.userSusbcription.unsubscribe();
  }
}
