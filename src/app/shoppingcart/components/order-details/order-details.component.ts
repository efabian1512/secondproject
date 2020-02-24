import { element } from 'protractor';
import { OrderService } from './../../../shared/services/order.service';
import { ActivatedRoute, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, isEmpty } from 'rxjs/operators';
import { UrlsService } from 'shared/services/urls.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  
  private order ={};
  private myorders = false;
  private url:string;
  private _adminUrl=false;
  private _myOrdersUrl=false;
  private _orderSuccess = false;
  isPaypal:boolean=false;
  
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private urlService : UrlsService
    
  
    ) { 

  
  }

async ngOnInit() {

  
    
    let id = this.route.snapshot.paramMap.get('id');

    if(id) 
     this.orderService.getASinglePaypalOrder(id).pipe(take(1))
    .subscribe(order => {
   

     if(order){
      this.order =  order;
      this.isPaypal=true;

     } 
      
        
     
      
     
      });
      this.identifyUrl();


      let numbers = Object.values(this.order);

      if (this.isPaypal===false){
        this.orderService.getASingleOrder(id).pipe(take(1))
    .subscribe(order1 => this.order = order1);
      }
  
  }



  
    
  

 private identifyUrl(){
    this.url = this.urlService.url;
    if(this.url)


      if(this.url.includes('myorders'))
      this._myOrdersUrl = true;

      if(this.url.includes('admin'))
      this._adminUrl = true;

      if(this.url.includes('orders'))
      this._orderSuccess = true;
 }






}
