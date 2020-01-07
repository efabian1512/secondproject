import { switchMap, map } from 'rxjs/operators';
import { Products } from './../../models/products';
import { Subscription } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$: AngularFireList<any>;
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService ) {

    this.subscription=this.productService.getAll().subscribe(products =>this.filteredProducts = this.products=products);
    //this.productService.getProduct().valueChanges().pipe(map(products=> this.filteredProducts = this.products = products));
   }

   filter(query: string){
     this.filteredProducts = (query) ?
     this.filteredProducts = this.filteredProducts.filter(p=> p.payload.node_.children_.root_.right.value.value_.toLowerCase().includes(query.toLocaleLowerCase())) :
     this.products;
   }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
