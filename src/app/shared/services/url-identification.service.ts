import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class UrlIdentification implements CanActivate {

  constructor( private urlService: UrlsService) { }


  canActivate(router,state: RouterStateSnapshot){

   
    
    this.urlService.assingUrl(state.url);
     

     return true;
  
          
  }
}
