import { AppUser } from '../models/app-user';
import { UsersService } from './users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 user$: Observable<firebase.User>;

  constructor(private userService: UsersService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$= this.afAuth.authState;
   }
  login(){
    
   let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl',returnUrl);


    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get AppUser$() :Observable<AppUser>{
    return this.user$.pipe(
      map((user) => {
        if(user) return this.userService.get(user.uid).valueChanges();

        return of(null);
     })
   ).pipe(
     switchMap(user => user))
  }
}
