import { OrderService } from './../../../shared/services/order.service';
import { ActivatedRoute, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { UrlsService } from 'shared/services/urls.service';

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
  
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private urlService : UrlsService
    
  
    ) { 

  
  }

async ngOnInit() {

  
    
    let id = this.route.snapshot.paramMap.get('id');

    if(id) this.orderService.getASingleOrder(id).pipe(take(1))
    .subscribe(order => {
      this.order =  order;
    

     
     
    });

    
  this.identifyUrl();
  
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
