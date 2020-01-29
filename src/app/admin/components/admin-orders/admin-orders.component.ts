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
 keys:any[]=[];
 susbcription:Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.susbcription=this.orderService.getOrders()
    .subscribe(orders => orders.forEach((order,index) => {
      this.orders[index] = order.payload.exportVal();
      this.keys[index] = order.key;
    }));
  }

  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }

}
