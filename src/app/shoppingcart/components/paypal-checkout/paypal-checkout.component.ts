import { OrderService } from './../../../shared/services/order.service';
import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { take } from 'rxjs/operators';
declare var paypal;
@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.css']
})
export class PaypalCheckoutComponent implements OnInit {
@ViewChild('paypal',{static: true}) paypalElement: ElementRef;

paidFor=false;


cart$:Observable<ShoppingCart>
shoppingCart: ShoppingCart;
paypalItems: any[]=[];
description:string;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService
    ) { }
  
  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    
    this.cart$.pipe(take(1)).subscribe(cart =>{this.shoppingCart = cart; this.shoppingCartToPaypal(this.shoppingCart)});

     //let shopCart:any = this.shoppingCart || {};

     
  }

  shoppingCartToPaypal(shoppingCart:ShoppingCart){
   
   let shop:any = shoppingCart || {};
   
    let shopCart:any = shop.items || {};
    //console.log(shopCart);
    this.description ="";
   for(let item of shopCart)
   this.description += item.quantity + ' - ' + item.title +'\n';
    


    paypal
     .Buttons({
       createOrder: (data, actions)=>{
         return actions.order.create({
           //purchase_units: this.paypalItems
          purchase_units: [{
            description: this.description,
            amount: {
              currency_code: 'USD',
              value: shop.totalPrice
            }
           }
             
           ]
          
  

         });
        
       },
       onApprove: async (data,actions) => {
         const order = await actions.order.capture();
         this.paidFor = true;
        
         console.log(order);
       },
       onError: err =>{
         console.log(err);
       }
      })
     .render(this.paypalElement.nativeElement);

  }

}
