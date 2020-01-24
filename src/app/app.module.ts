import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shoppingcart/shopping.module';


import { CheckOutComponent } from './shoppingcart/components/check-out/check-out.component';

import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'ng-angular8-datatable';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';

import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { MyOrdersComponent } from './shoppingcart/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './shoppingcart/components/order-success/order-success.component';
import { ProductFilterComponent } from './shoppingcart/components/products/product-filter/product-filter.component';
import { ProductsComponent } from './shoppingcart/components/products/products.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ShippingFormComponent } from './shoppingcart/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shoppingcart/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shoppingcart/components/shopping-cart/shopping-cart.component';





@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule,
    ShoppingModule,
    RouterModule.forRoot([
      {path:'', component: ProductsComponent},
      {path:'login', component: LoginComponent},
     
     
    ])
    
  ],
  providers: [
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
