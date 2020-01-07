import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private db: AngularFireDatabase) { }
  values;
  getCategories(){
   return this.db.list<any>('/categories').snapshotChanges();
  
  }
}
