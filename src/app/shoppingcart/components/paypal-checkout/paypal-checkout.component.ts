import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { take } from 'rxjs/operators';
import { PaypalOrder } from 'shared/models/paypal-order';

declare var paypal;

@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.css']
})
export class PaypalCheckoutComponent implements OnInit, OnDestroy {
@ViewChild('paypal',{static: true}) paypalElement: ElementRef;


paidFor=false;


cart$:Observable<ShoppingCart>
shoppingCart: ShoppingCart;
paypalItems: any[]=[];
description:string;
shipping: any={};
payerName: string;
userSusbcription: Subscription;
userId: string;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
    
    ) { }
  
  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    this.userSusbcription = this.authService.user$.subscribe(user => this.userId = user.uid);
    
    this.cart$.pipe(take(1)).subscribe(cart =>{this.shoppingCart = cart; this.shoppingCartToPaypal(this.shoppingCart)});
   }

 
  ngOnDestroy(){
    
    this.userSusbcription.unsubscribe();
  }


  shoppingCartToPaypal(shoppingCart:ShoppingCart){
   
   let shop:any = shoppingCart || {};
   
    let shopCart:any = shop.items || {};
    
    this.description ="";
   for(let item of shopCart)
   this.description += item.quantity + ' - ' + item.title +'\n';
    


    paypal
     .Buttons({
      
      createOrder: (data, actions)=>{
         return actions.order.create({
          
          purchase_units: [{
            description: this.description,
           
           
            amount: {
              currency_code: 'USD',
              value: shop.totalPrice
            },
           }]
         });
        
       },
       onApprove: async (data,actions) => {
         const order = await actions.order.capture();
         this.paidFor = true;
         let payer = order.payer || {};
         this.payerName = payer.name;
         let units = order.purchase_units || {};
         let orderId = order.id;
         for(let unit of units)
         this.shipping = unit.shipping;

         let userOrder = new PaypalOrder(this.userId,this.shipping,shoppingCart,orderId);
         let result = await this.orderService.placePaypalOrder(userOrder);
         console.log(order);
         
         this.router.navigate(['/order-success',result.key]);

         
         


         /*return actions.order.get().then((orderDetails)=>{
            console.log(orderDetails);
         });*/
       },
      onError: err =>{
         console.log(err);
       },
      })
     .render(this.paypalElement.nativeElement);

  }

}
