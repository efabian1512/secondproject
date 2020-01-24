import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from 'app/shoppingcart/components/products/products.component';
import { ShoppingCartComponent } from 'app/shoppingcart/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from 'app/shoppingcart/components/check-out/check-out.component';
import { OrderSuccessComponent } from 'app/shoppingcart/components/order-success/order-success.component';
import { MyOrdersComponent } from 'app/shoppingcart/components/my-orders/my-orders.component';
import { ProductFilterComponent } from 'app/shoppingcart/components/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from 'app/shoppingcart/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from 'app/shoppingcart/components/shipping-form/shipping-form.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CustomFormsModule } from 'ng2-validation';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomFormsModule,
    FormsModule,
    RouterModule.forChild([
      {path:'products', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},
     

      {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path:'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path:'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]}

    ])
    
  ]
})
export class ShoppingModule { }
