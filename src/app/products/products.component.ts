import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {

  
 
  products : Product[] =[];
  category: string;
  filteredProducts: Product[] =[];
  cart: ShoppingCart;
  subscription: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  
   
    ) {
      

      this.productService.getAll().pipe(switchMap(products => { 
        products.forEach((product,index) => {
          this.products[index] = product.payload.exportVal();
          this.products[index].key = product.key;
          
        });
        return this.route.queryParamMap;
      
      })).subscribe(value =>{
        this.category = value.get('category');
        this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.category === this.category) :
        this.products;
        
       });
      }

      async ngOnInit(){
         this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
      }

      ngOnDestroy(){
        this.subscription.unsubscribe();
      }
 

}
