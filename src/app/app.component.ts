import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
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
      if(!user) return;
         
        this.usersService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;

          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        } );
  }

 
}
