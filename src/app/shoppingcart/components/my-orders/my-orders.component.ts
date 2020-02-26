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
  ordersSubscription:Subscription;
  paypalOrderSubscription: Subscription;
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
     this.userSusbcription= this.authService.user$.subscribe(user => 
      {this.userId =user.uid; this.getOrdersByUser(this.userId); 
       this.getPaypalOrdersByUser(this.userId);
      });
     this.getUrl();
  }

  private getOrdersByUser(uid:string){
    this.ordersSubscription =this.orderService.getOrdersByUser(uid)
    .subscribe(orders => orders.forEach((order) =>{
      this.orders.push(order);
    })
  );
  
  }

  private getPaypalOrdersByUser(uid:string){
    this.paypalOrderSubscription =this.orderService.getPaypalOrdersByUser(uid)
    .subscribe(orders => orders.forEach((order) =>{
      this.orders.push(order);
    })
  );
  
  }

  getUrl(){
   this.url = this.urlService.url;
  }

 ngOnDestroy(){
   this.ordersSubscription.unsubscribe();
   this.paypalOrderSubscription.unsubscribe();
   this.userSusbcription.unsubscribe();
 }

}
