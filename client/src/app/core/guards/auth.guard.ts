import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    
    if (!this.authenticationService.isLoggedIn) {
      if (route.url[0].path === 'profile'
      || route.url[0].path === 'sell') {
        this.router.navigate(['/users/login']);
        return false;
      }
      return true; //can proceed
    } else {
      if (route.url[0].path === 'profile' ||
      route.url[0].path === 'sell') {
        return true;
      }
      this.router.navigate(['/404']);
      return false; //cannot proceed
    }
  }
}
