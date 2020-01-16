import { switchMap } from 'rxjs/operators';
import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{
  @Input('category') category;
   categories$

  constructor( private categoryService: CategoryService)
   { 
    this.categories$=this.categoryService.getAll();

  }

 
 

}
