import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private _url:string;
  constructor() { }


  assingUrl(url:string){
    return this._url = url;

  }

  get url(){
    return this._url;
  }

}
