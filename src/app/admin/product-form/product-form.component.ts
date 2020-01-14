import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnDestroy } from '@angular/core';
import {take} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  implements OnDestroy {

  categories$: AngularFireList<any>;
  product = {};
  subscription: Subscription;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService, 
    private productService: ProductService
    ) { 
    this.categories$ = this.categoryService.getAll() as any;
    this.id= this.route.snapshot.paramMap.get('id');
  if(this.id) this.subscription=this.productService.get(this.id).snapshotChanges().subscribe(product => {this.product = product; console.log(product)});
  }

  save(product){

    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);


    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?'))return;

      this.productService.delete(this.id);
      
      this.router.navigate(['/admin/products']);
    
  }
 
  ngOnDestroy() {
    if(this.subscription)
    this.subscription.unsubscribe();
  }

}
