import { Products } from './models/products';
import { take} from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private article ={};
  value1: any={};
  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

private getCart(cartId){
  return this.db.object('/shopping-carts/' + cartId);
}

private async getOrCreateCartId(){
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

async addToCart(product: Products){
  let cartId = await this.getOrCreateCartId();
  

  let item$ = this.getItem(cartId,product.key);
  const firebaseItem = this.getFirebaseItem(cartId,product.key);

  this.articleValue(product.key);

  item$.pipe(take(1)).subscribe(item => {
    if(item.payload.exists()) {firebaseItem.update({quantity: item.payload.exportVal().quantity + 1});}
    else {firebaseItem.set({product: this.article , quantity: 1});}
  });
}
}




