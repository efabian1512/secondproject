import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shoppingcart/components/products/products.component';
import { ShoppingModule } from './shoppingcart/shopping.module';
import { PaypalCheckoutComponent } from './shoppingcart/components/paypal-checkout/paypal-checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 






@NgModule({
  declarations: [
    AppComponent
  
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ShoppingModule,
    RouterModule.forRoot([
      {path:'', component: ProductsComponent},
      {path:'login', component: LoginComponent},
      {path:'paypalcheckout',component:PaypalCheckoutComponent},
     
      {path:'**',component: ProductsComponent}
     
     
    ])
    
  ],
  providers: [
   
    
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
