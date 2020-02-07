import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrls: ['./payment-method-modal.component.css']
})
export class PaymentMethodModalComponent implements OnInit {

  constructor() { }
  
  showModal:boolean=false;
  ngOnInit() {
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
