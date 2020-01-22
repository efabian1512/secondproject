import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: any[] = [];
  ordersSusbcription:Subscription;
  userSusbcription:Subscription;
  keys: any[] =[];
  userId:string;
  
  constructor( 
    private orderService: OrderService, 
    private authService: AuthService
    ) { }

  ngOnInit() {
     this.userSusbcription= this.authService.user$.subscribe(user => {this.userId =user.uid; this.getOrderByUser(this.userId);});
    
  }

  private getOrderByUser(uid:string){
    this.ordersSusbcription =this.orderService.getOrdersByUser(uid).subscribe(orders => orders.forEach(
      (order, index) => 
      {
        
        this.orders[index]= order.payload.exportVal();
        this.keys[index]= order.key;
        
     } 
     
     ) );

  }

 ngOnDestroy(){
   this.ordersSusbcription.unsubscribe();
   this.userSusbcription.unsubscribe();
 }

}
