import { PaypalCheckoutComponent } from 'app/shoppingcart/components/paypal-checkout/paypal-checkout.component';
import { PaymentMethodModalComponent } from 'app/shoppingcart/components/payment-method-modal/payment-method-modal.component';
import { AdminOrdersSourceGuard } from './../shared/services/admin-orders-source-guard.service';
import { CardComponent } from 'app/shoppingcart/components/card/card.component';

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
import { UrlIdentification } from 'shared/services/url-identification.service';




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
    OrderDetailsComponent,
    PaymentMethodModalComponent,
    PaypalCheckoutComponent,
    CardComponent
  
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'products', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},
     

      {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path:'paypal',component:PaypalCheckoutComponent, canActivate: [AuthGuard]},
      {path:'card',component:CardComponent, canActivate: [AuthGuard]},
      {path:'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path:'order-detail/:source/:id', component: OrderDetailsComponent, canActivate: [AuthGuard,UrlIdentification]},
      {path:'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard,UrlIdentification]}

    ])
    
  ]
  
})
export class ShoppingModule { }
