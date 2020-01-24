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






@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AdminModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
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
