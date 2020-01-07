import { Products } from './models/products';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  getProduct():AngularFireList<Products>{
    return this.db.list('/products/');
  }
}
