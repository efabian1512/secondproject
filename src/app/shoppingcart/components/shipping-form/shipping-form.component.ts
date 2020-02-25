import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Subscription } from 'rxjs';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart;
  shipping= {

    address:{},
    name:{

    }
  } || {};
 
  userSusbcription: Subscription;
  userId: string;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    ){}

  ngOnInit() {
    this.userSusbcription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy(){
    
    this.userSusbcription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key])
  } 

}
