import { Order } from './../../../shared/models/order';
import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';
import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { take } from 'rxjs/operators';
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
    private authService: AuthService
    
    ) { }
  
  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    this.userSusbcription = this.authService.user$.subscribe(user => this.userId = user.uid);
    
    this.cart$.pipe(take(1)).subscribe(cart =>{this.shoppingCart = cart; this.shoppingCartToPaypal(this.shoppingCart)});

     //let shopCart:any = this.shoppingCart || {};

     
  }

 
  ngOnDestroy(){
    
    this.userSusbcription.unsubscribe();
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
            },
            shipping: {
                name: {full_name:'Edwin Fabian Perez'},
                address: {
                  adress_line1:'Calle Respaldo San Antonio No.22',
                  admin_area_2:'San Isidro',
                  admin_area_1:'Santo Domingo',
                  postal_code:'11902',
                  country_code:'DO'
                }
            }
           }]
          
  

         });
        
       },
       /*onShippingChange:(data,actions)=>{
           this.shipping = data.shipping_address;
           console.log(this.shipping);
       },*/
      
       onApprove: async (data,actions) => {
         const order = await actions.order.capture();
         this.paidFor = true;
         let payer = order.payer || {};
         this.payerName = payer.name;
         let units = order.purchase_units || {};
         let orderId = order.id;
         for(let unit of units)
         this.shipping = unit.shipping;

         let userOrder = new Order(this.userId,this.shipping,shoppingCart,orderId);
         this.orderService.placePaypalOrder(userOrder);
         console.log(order);
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
