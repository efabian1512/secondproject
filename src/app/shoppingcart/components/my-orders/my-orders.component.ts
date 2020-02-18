import { UrlsService } from './../../../shared/services/urls.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacedOrder } from 'shared/models/placed-order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: PlacedOrder[] = [];
  ordersSusbcription:Subscription;
  userSusbcription:Subscription;
  //keys: any[] =[];
  userId:string;
  url:string;
  
  constructor( 
    private orderService: OrderService, 
    private authService: AuthService,
    private urlService: UrlsService
    ) { }

  ngOnInit() {
     this.userSusbcription= this.authService.user$.subscribe(user => {this.userId =user.uid; this.getOrderByUser(this.userId);});
     this.getUrl();
  }

  private getOrderByUser(uid:string){
    this.ordersSusbcription =this.orderService.getOrdersByUser(uid).subscribe(orders => orders.forEach(
      (order, index) => 
      {
        
        this.orders[index]= order.payload.exportVal();
        this.orders[index].key= order.key;
        
     } 
     
     ) );

  }

  getUrl(){
   this.url = this.urlService.url;
  }

 ngOnDestroy(){
   this.ordersSusbcription.unsubscribe();
   this.userSusbcription.unsubscribe();
 }

}
