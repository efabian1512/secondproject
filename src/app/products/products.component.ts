import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Products } from './../models/products';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  
 
  products : Products[] =[];
  category: string;
  filteredProducts: Products[] =[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  
   
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

 

}
