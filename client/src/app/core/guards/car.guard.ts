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
import { CarApiService } from 'src/app/features/car/car-api.service';

@Injectable({ providedIn: 'root' })
export class CarActionsActivate implements CanActivate {
  carOwner = '' as any;
  constructor(
    private authenticationService: AuthenticationService,
    private carApiService: CarApiService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if(!this.authenticationService.isLoggedIn) {
      this.router.navigate(['/404']);
      return false;
    } else {
      const carId = route.params['carId'];
      const car = this.carApiService.getCar(carId).subscribe(data => {
        this.carOwner = data.owner;
        const userId = this.authenticationService.user?.userId;
        // const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId;
        if(this.carOwner !== userId) {
          this.router.navigate(['/404']);
          return false;
        }
        return true;
      });
      return true;
    }
  }
}
