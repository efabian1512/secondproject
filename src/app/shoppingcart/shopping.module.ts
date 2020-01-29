
import { OrderDetailsComponent } from './components/order-details/order-details.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckOutComponent } from 'app/shoppingcart/components/check-out/check-out.component';
import { MyOrdersComponent } from 'app/shoppingcart/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'app/shoppingcart/components/order-success/order-success.component';
import { ProductFilterComponent } from 'app/shoppingcart/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'app/shoppingcart/components/products/products.component';
import { ShippingFormComponent } from 'app/shoppingcart/components/shipping-form/shipping-form.component';
import {ShoppingCartSummaryComponent} from 'app/shoppingcart/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from 'app/shoppingcart/components/shopping-cart/shopping-cart.component';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'products', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},
     

      {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path:'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path:'order-detail/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
      {path:'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]}

    ])
    
  ]
  
})
export class ShoppingModule { }
