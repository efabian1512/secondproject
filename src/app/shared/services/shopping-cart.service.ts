import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/products';
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

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().
    pipe(map(values => {
      let itemsObject = values.payload.exportVal() || {};
      return new ShoppingCart(itemsObject.items);
    }))

    
   }

   async addToCart(product: Product){
    this.updateItem(product, 1);
   }
  
   async removeFromCart(product: Product){
    this.updateItem(product, -1);
      }

   async clearCart(){
    let cartId = await this.getOrCreateCartId();
        this.db.object('/shopping-carts/'+cartId+'/items').remove();
   }

   
   

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

   private async getOrCreateCartId() :Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

     
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
        
      
}
private getItem(cartId, productId){
 return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId).snapshotChanges()
 .pipe(map(item => item));
 
}

private getFirebaseItem(cartId, productId){
  return  this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
}

private async updateItem(product: Product, change: number){

  let cartId = await this.getOrCreateCartId();
  

  let item$ = this.getItem(cartId,product.key);
  let firebaseItem = this.getFirebaseItem(cartId,product.key);


  item$.pipe(take(1)).subscribe(item => {
    
    let itemObject = item.payload.exportVal() || 0; 
    let quantity = (itemObject.quantity || 0) + change;
    if(quantity===0) firebaseItem.remove();
    else
    firebaseItem.update({
     
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price
        ,quantity: quantity
      });
  });
  
}

}



