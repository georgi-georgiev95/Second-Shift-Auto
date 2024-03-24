import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/types/user.interface';
import { AuthenticationService } from '../authentication.service';
import { CarApiService } from '../../car/car-api.service';
import { Car } from 'src/app/types/car.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  totalProfit = 0;
  userData: Profile = {
    username: '',
    email: '',
    userId: '',
  };
  userCars: Car[] = [];

  constructor(private authenticationService: AuthenticationService, private carApiService: CarApiService) { }
  
  ngOnInit(): void {
    const userCars = this.carApiService.getUserCars(this.authenticationService.user?.userId!).subscribe(data => {
      this.userCars = data;
      data.forEach((car) => {
        if(car.buyer?.length! > 0) {
          this.totalProfit += Number(car.price);
        }
      })
    });

    this.userData = {
      username: this.authenticationService.user?.username || '',
      email: this.authenticationService.user?.email || '',
      userId: this.authenticationService.user?.userId || '',
    };
  }
  
}
