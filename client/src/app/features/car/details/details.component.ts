import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/types/car.interface';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  carData: Car | undefined;
  imageUrl: string | undefined;

  constructor(
    private carApiService: CarApiService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private route: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn;
  }

  get isOwner(): boolean {
    if (this.carData?.owner === JSON.parse(localStorage.getItem('userData') || '{}').userId) {
      return true;
    }
    return false;
  }

  deleteCar(carId: string | undefined) {
    this.carApiService.deleteCar(carId).subscribe(() => {
      this.route.navigate(['/cars/catalog']);
    });
  }

  ngOnInit(): void {
    this.getCar().subscribe((data) => {
      this.carData = data;
      this.carData.additionalImages.push({ url: this.carData?.image });
      this.imageUrl = this.carData?.image;
    });
  }

  changeImage(url: string) {
    this.imageUrl = url;
  }

  getCar() {
    const carId = this.activatedRoute.snapshot.params['carId'];
    return this.carApiService.getCar(carId);
  }
}
