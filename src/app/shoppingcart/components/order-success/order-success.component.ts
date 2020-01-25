import { take } from 'rxjs/operators';
import { OrderService } from './../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  id: string;
  order = {};
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
    ) { }

  ngOnInit() {

    this.id =this.route.snapshot.paramMap.get('id');

    
    //this.orderService.getASingleOrder(this.id).pipe(take(1)).subscribe(order => this.order = order.payload.exportVal());

  }

}
