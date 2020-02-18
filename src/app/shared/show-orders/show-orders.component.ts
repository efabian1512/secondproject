import { Component, OnInit, Input } from '@angular/core';
import { PlacedOrder } from 'shared/models/placed-order';

@Component({
  selector: 'show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

  @Input('orders') orders:PlacedOrder[]=[];
  //@Input('keys') keys:any[]=[];
  @Input('url') url:string;
  source:string;


  ngOnInit() {
   if(this.url)

   if(this.url.includes('my'))
   {
     this.source ="myorders";
   }else{
     this.source ="admin";
   }
    

  }

}
