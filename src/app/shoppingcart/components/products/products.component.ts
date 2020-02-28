import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  
 
  products : Product[] =[];
  category: string;
  filteredProducts: Product[] =[];
  cart$: Observable<ShoppingCart>;
 
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private orderService: OrderService
   
    ) {
      

      
      }

      async ngOnInit(){
         this.cart$ = await this.cartService.getCart();
        this.populateProducts();
      
         
      }

     private populateProducts(){
      this.productService.getAll().pipe(switchMap(products => { 
        products.forEach((product,index) => {
          this.products[index] = product.payload.exportVal();
          this.products[index].key = product.key;
          
        });
        return this.route.queryParamMap;
      
      })).subscribe(value =>{
        this.category = value.get('category');
        this.applyFilter();
       });
     } 

     private applyFilter(){
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) :
      this.products;
     }
 

}
