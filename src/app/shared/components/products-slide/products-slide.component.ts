import { SlideContentService } from './../../../admin/services/slide-content.service';

import { Component, ViewChild,OnInit } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'products-slide',
  templateUrl: './products-slide.component.html',
  styleUrls: ['./products-slide.component.css']
})
export class ProductsSlideComponent implements OnInit {

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


  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
