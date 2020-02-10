import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrls: ['./payment-method-modal.component.css']
})
export class PaymentMethodModalComponent implements OnInit {

  constructor(private router: Router) { }
  
  selection:string;

  showModal:boolean=false;
  ngOnInit() {
  }

  selectionValue(event){
    this.selection = event.target.value;
  }

  methodSelection(){

    
     if(this.selection)
      if(this.selection === "paypal"){
        this.router.navigate(['/paypal']);
      }else{
        this.router.navigate(['card']);
      }
    this.showModal = false;

  }

}
