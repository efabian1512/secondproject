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
 susbcription:Subscription;
 url:string;

  constructor(
    private orderService: OrderService,
    private urlService: UrlsService
    ) { }

  ngOnInit() {
    this.susbcription=this.orderService.getOrders()
    .subscribe(orders => orders.forEach((order,index) => {
      this.orders[index] = order.payload.exportVal();
      this.orders[index].key = order.key;
    }));

    this.getUrl();
  }

  getUrl(){
   this.url = this.urlService.url;
  }

  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }

}
