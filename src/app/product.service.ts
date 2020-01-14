import { Products } from './models/products';
import { AngularFireDatabase, AngularFireObject, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  p: Observable<Products>

  pro: any[];

  constructor(private db: AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
    
  }

  getAll(){
    return this.db.list('/products').snapshotChanges();
  }

  get(productId){
   return this.db.object<any>('/products/' + productId);
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

  getProducts(){
    return this.db.list('/products/').valueChanges();
  }

 
}
