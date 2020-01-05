import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private usersService: UsersService,private auth: AuthService, private router: Router){
    this.auth.user$.subscribe(user => {
      if(user){
         
        this.usersService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
     


    } );
  }

 
}
