import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideContentService {

  constructor(private db:AngularFireDatabase) { }


  create(slideContent){
    this.db.list('/slide-content').push(slideContent);
  }

  getAll(){
    return this.db.list('/slide-content').snapshotChanges();
  }
}
