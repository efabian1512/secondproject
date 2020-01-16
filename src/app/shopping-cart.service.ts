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

async addToCart(product){
  let cartId = await this.getOrCreateCartId();


  let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.payload.key).snapshotChanges();
  const firebaseItem = this.db.object('/shopping-carts/' + cartId + '/items/' + product.payload.key);

  let product$ = this.db.object('/products/' + product.payload.key).valueChanges();

  product$.pipe(take(1)).subscribe(product => this.article = product);

  item$.pipe(take(1)).subscribe(item => {
    if(item.payload.exists()) {
      firebaseItem.update(
      {
       quantity: item.payload.exportVal().quantity + 1});
       }
      
      else { firebaseItem.set({product: product.payload.exportVal(), quantity: 1});
    }
  });

}
}




