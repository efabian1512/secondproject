import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private db: AngularFireDatabase) { }

  storeOrder(order){
    this.db.list('/orders').push(order);
  }
}
