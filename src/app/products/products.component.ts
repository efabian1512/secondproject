import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Products } from './../models/products';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  
 
  products : any[] =[];
  category: string;
  filteredProducts: any[] =[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
   
    ) {
      this.productService.getAll().pipe(switchMap(products => { 
        this.products = products;
        return this.route.queryParamMap;
      
      })).subscribe(value =>{
        this.category = value.get('category');
        this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.payload.node_.children_.root_.left.left.value.value_ === this.category) :
        this.products;
  
      });
      
      
     
   

    
   
    
   }

 

}
