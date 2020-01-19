import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/products';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private article ={};

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

   async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().
    pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
}

private async getOrCreateCartId() :Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

     
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
        
      
}
private getItem(cartId, productId){
 return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).snapshotChanges();
 
}

private getFirebaseItem(cartId, productId){
  return  this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

private articleValue(productId){
  this.db.object('/products/' + productId ).snapshotChanges()
  .pipe(take(1)).subscribe(product => this.article = product.payload.exportVal());

}

async addToCart(product: Product){
  this.updateItem(product, 1);

}

 async removeFromCart(product: Product){
  this.updateItem(product, -1);
     
 }
private async updateItem(product: Product, change: number){

  let cartId = await this.getOrCreateCartId();
  

  let item$ = this.getItem(cartId,product.key);
  const firebaseItem = this.getFirebaseItem(cartId,product.key);

  this.articleValue(product.key);

  item$.pipe(take(1)).subscribe(item => {
    if(item.payload.exists()) {firebaseItem.update({quantity: item.payload.exportVal().quantity + change});}
    else {firebaseItem.set(
      { 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price
        ,quantity: change}
      );}
  });
  
}

}




