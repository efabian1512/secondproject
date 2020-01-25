import { OrderService } from './../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  
  order ={};
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
    ) { 

  
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if(id) this.orderService.getASingleOrder(id).pipe(take(1))
    .subscribe(order => {let orderObject = order.payload.exportVal() || {}; this.order = orderObject.shipping });

  
  }


}
