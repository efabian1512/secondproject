



import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import { PlacedOrder } from 'shared/models/placed-order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

private array: PlacedOrder[]=[]; 
private array2:PlacedOrder[]=[]; 
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
      return this.array.push(new PlacedOrder(order.payload.exportVal(),order.key));
   
      //if(index===orders.length-1)
       
      
        
     
    }) )).pipe(map(o=> { return this.array}));
    

  }

  get arayyy (){
   console.log(this.array);
    return this.array;
  }

  getASingleOrder(orderId: string){
    return this.db.object('/orders/'+orderId)
    .snapshotChanges().pipe(map(order =>{ 
     return new PlacedOrder(order.payload.exportVal(),order.key);
    }));
  
  }
  getOrdersByUser(userId: string){
    
    return this.db.list('/orders',(ref => ref.orderByChild('userId').equalTo(userId))).snapshotChanges();

  }
  getPaypalOrders(){
    return this.db.list('/paypal_orders').snapshotChanges()
    .pipe(map(orders => orders.forEach((order)=>{
       this.array2.push(new PlacedOrder(order.payload.exportVal(),order.key));
    }))).pipe(map(order=> {return this.array2}));
   
  
    

  }

  getASinglePaypalOrder(orderId: string){
    return this.db.object('/paypal_orders/'+orderId)
    .snapshotChanges().pipe(map(order =>{ 
     return new PlacedOrder(order.payload.exportVal(),order.key);
    }));
  
  }
  getPaypalOrdersByUser(userId: string){
    
    return this.db.list('/paypal_orders',(ref => ref.orderByChild('userId').equalTo(userId))).snapshotChanges();

  }
}
