



import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import { PlacedOrder } from 'shared/models/placed-order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

private ordersArray: PlacedOrder[]=[]; 
private ordersArray2:PlacedOrder[]=[]; 
private singleUserOrders: PlacedOrder[]=[];
private singleUserOrders2: PlacedOrder[]=[];


  constructor( private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order){
     let result = await this.db.list('/orders').push(order);
     this.cartService.clearCart();
     return result;
  }
  async placePaypalOrder(order){
    let result = await this.db.list('/paypal_orders').push(order);
    this.cartService.clearCart();
    return result;
 }

   getOrders(){
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(orders => orders.forEach((order,index) => {
      let orderr =new PlacedOrder(order.payload.exportVal(),order.key);
      this.ordersArray[index]=orderr;
   
     
       }) )).pipe(map(o=> { return this.ordersArray}));
    

  }

 

  getASingleOrder(orderId: string){
    return this.db.object('/orders/'+orderId)
    .snapshotChanges().pipe(map(order =>{ 
     return new PlacedOrder(order.payload.exportVal(),order.key);
    }));
  
  }
  getOrdersByUser(userId: string){
    
    return this.db.list('/orders',(ref => ref.orderByChild('userId').equalTo(userId))).snapshotChanges()
    .pipe(map(orders =>{
      orders.forEach((order,index)=>{
        let placedOrder = new PlacedOrder(order.payload.exportVal(),order.key);

        this.singleUserOrders[index]= placedOrder;
      })
    })).pipe(map(orders => {return this.singleUserOrders}));

  }
  getPaypalOrders(){
    return this.db.list('/paypal_orders').snapshotChanges()
    .pipe(map(orders => orders.forEach((order,index)=>{
     let orderr = new PlacedOrder(order.payload.exportVal(),order.key);
     this.ordersArray2[index]=orderr;
    }))).pipe(map(order=> {return this.ordersArray2}));
   
  
    

  }

  getASinglePaypalOrder(orderId: string){
    return this.db.object('/paypal_orders/'+orderId)
    .snapshotChanges().pipe(map(order =>{ 
     return new PlacedOrder(order.payload.exportVal(),order.key);
    }));
  
  }
  getPaypalOrdersByUser(userId: string){
    
    return this.db.list('/paypal_orders',(ref => ref.orderByChild('userId').equalTo(userId))).snapshotChanges()
    .pipe(map(orders =>{
      orders.forEach((order,index)=>{
        let placedOrder = new PlacedOrder(order.payload.exportVal(),order.key);

        this.singleUserOrders2[index]= placedOrder;
      })
    })).pipe(map(orders => {return this.singleUserOrders2}));


  }
}
