import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  shoppingCartItemCount: number;


  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
      
   }

  async ngOnInit(){
    this.auth.AppUser$.subscribe(AppUser => this.appUser = AppUser);
    
   this.cart$ = await this.cartService.getCart();

}

  logout(){
   this.auth.logout();
  }

}
