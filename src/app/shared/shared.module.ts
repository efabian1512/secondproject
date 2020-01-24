import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UsersService } from './services/users.service';




@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers:[
    AuthService,
    AuthGuard,
    UsersService,
    CategoryService,
    ProductService, 
    ShoppingCartService,
    OrderService
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
