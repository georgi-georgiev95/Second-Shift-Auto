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
  carOwner: string | undefined;
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
      this.carApiService.getCar(carId).subscribe(data => {
        this.carOwner = data.owner;
        const userId = this.authenticationService.user?.userId;
        if(this.carOwner !== userId) {
          this.router.navigate(['/404']);
          return false;
        }
        if(data.buyer?.length! > 0) {
          this.router.navigate(['/404']);
          return false;
        }
        return true;
      });
      return true;
    }
  }
}
