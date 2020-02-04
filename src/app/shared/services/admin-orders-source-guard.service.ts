import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersSourceGuard implements CanActivate {

  constructor(
    private  router: Router,
    private  route: ActivatedRoute
    ) { }

    canActivate(route, state: RouterStateSnapshot){

      let id= this.route.snapshot.paramMap.get('id');
      
      if(!state.url.includes('admin') || !state.url.includes('myorders'))
      this.router.navigate(['/order-detail/order/'+id]);
      return false;


     

      

    }
}
