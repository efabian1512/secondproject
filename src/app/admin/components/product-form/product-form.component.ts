import { Component } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

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
  if(this.id) this.subscription=this.productService.get(this.id).snapshotChanges().
     pipe(take(1)).subscribe(product => this.product = product.payload.exportVal());
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
 
 
}
