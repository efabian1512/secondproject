import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/products';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$: AngularFireList<any>;
  products: Product[] =[];
  filteredProducts: Product[]=[];
  subscription: Subscription;
  up = true;

  
  


  constructor(private productService: ProductService ) {

    this.subscription=this.productService.getAll().subscribe(products => products.
      forEach((product,index)=> {
         this.filteredProducts[index] = this.products[index] =product.payload.exportVal();
         this.filteredProducts[index].key = this.products[index].key = product.key;
        
        }));
    //this.productService.getProduct().valueChanges().pipe(map(products=> this.filteredProducts = this.products = products));
   }
  
    
   

   filter(query: string){
     this.filteredProducts = (query) ?
     this.filteredProducts = this.filteredProducts.filter(p=> p.title.toLowerCase().includes(query.toLocaleLowerCase())) :
     this.products;
   }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
