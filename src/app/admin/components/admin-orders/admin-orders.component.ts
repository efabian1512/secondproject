import { UrlsService } from 'shared/services/urls.service';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacedOrder } from 'shared/models/placed-order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {
 orders:PlacedOrder[]=[];
 //keys:any[]=[];
 ordersSubscription:Subscription;
 paypalOrdersSubscription: Subscription;
 url:string;
 gIndex:number=0;
  constructor(
    private orderService: OrderService,
    private urlService: UrlsService
    ) { }

  ngOnInit() {
    
    this.ordersSubscription=this.orderService.getOrders().subscribe(orders => orders.forEach((order)=>{
      this.orders.push(order);
     
    }));
  //console.log(this.orders);
     
  

   this.paypalOrdersSubscription = this.orderService.getPaypalOrders()
    .subscribe(orders =>  orders.forEach((order)=>{
    
      this.orders.push(order);
     
    
    }) );

    this.getUrl();
  }

  getUrl(){
   this.url = this.urlService.url;
  }

  ngOnDestroy(){
    this.ordersSubscription.unsubscribe();
    this.paypalOrdersSubscription.unsubscribe();
  }

}
