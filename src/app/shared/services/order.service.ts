
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { PlacedOrder } from 'shared/models/placed-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor( private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order){
     let result = await this.db.list('/orders').push(order);
     this.cartService.clearCart();
     return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges();
  
    

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
}
