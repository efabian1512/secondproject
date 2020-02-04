import { AdminOrdersSourceGuard} from './services/admin-orders-source-guard.service';


import { RouterModule } from '@angular/router';
import { ShowOrdersComponent } from 'shared/show-orders/show-orders.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'ng-angular8-datatable';
import { CustomFormsModule } from 'ng2-validation';
import { ProductService } from 'shared/services/product.service';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UsersService } from './services/users.service';
import { UrlIdentification } from './services/url-identification.service';
import { UrlsService } from './services/urls.service';





@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    ShowOrdersComponent
  ],
  imports: [
    CommonModule,
    DataTableModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule
   
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    DataTableModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ShowOrdersComponent
  ],
  providers:[
    AuthService,
    AuthGuard,
    UsersService,
    CategoryService,
    ProductService, 
    ShoppingCartService,
    OrderService,
    UrlIdentification,
    UrlsService,
    AdminOrdersSourceGuard
   
  ]
 
})
export class SharedModule { }
