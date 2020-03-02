import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SlideContentService } from 'app/admin/services/slide-content.service';

@Component({
  selector: 'carousel-holder-component',
  templateUrl: './carousel-holder-component.html',
  styleUrls: ['./carousel-holder-component.css']
})
export class CarouselHolderComponent implements OnInit {



  images:any =[];
  constructor(private slideService : SlideContentService) { }



  ngOnInit() {
    this.slideService.getAll().subscribe(images => {
      images.forEach((image,index) => {
             let object = image.payload.exportVal() || {};
             this.images[index] = object;
      });
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplaySpeed:4000,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    navSpeed: 700,
    //navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    //navText:["<i class='fas fa-arrow-circle-left'></i>","<i class='fas fa-arrow-circle-right'></i>"],
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
