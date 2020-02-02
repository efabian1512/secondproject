import { UsersService } from 'shared/services/users.service';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map} from 'rxjs/operators';
import { Observable} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private userService: UsersService, 
    private auth: AuthService,
    private router: Router
    ) { }

  canActivate(): Observable<boolean>{
    
   return this.auth.AppUser$
      .pipe(map(appUser => {
        if(appUser.isAdmin) return true;
         
        this.router.navigate(['/my/orders']);
        return false;

      
      }));
      
    
  }
}
