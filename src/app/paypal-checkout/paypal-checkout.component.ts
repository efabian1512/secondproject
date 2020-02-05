import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var paypal;
@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.css']
})
export class PaypalCheckoutComponent implements OnInit {
@ViewChild('paypal',{static:true}) paymentElement: ElementRef;

paidFor;
product = {
  price: 5,
  description:'Red Hawk Cheese',
  img: 'https://www.welshcheesecompany.co.uk/wp-content/uploads/2017/09/2M2A8471-768x512.jpg'
};


  constructor() { }

  ngOnInit() {

    paypal
     .Buttons({
       createOrder:(data, actions)=>{
         return actions.order.create({
          purchase_units: [{
            description: this.product.description,
            amount: {
              currency_code: 'USD',
              value: this.product.price
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
     .render(this.paymentElement.nativeElement);
  }

}
