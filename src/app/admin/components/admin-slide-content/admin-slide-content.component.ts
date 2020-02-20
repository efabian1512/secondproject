import { SlideContentService } from './../../services/slide-content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-slide-content',
  templateUrl: './admin-slide-content.component.html',
  styleUrls: ['./admin-slide-content.component.css']
})
export class AdminSlideContentComponent implements OnInit {

  slideInfo: any={};

  constructor(private slideService: SlideContentService) { }


  ngOnInit() {
  }

  save(slideInfo){
   this.slideService.create(slideInfo);
  }

}
