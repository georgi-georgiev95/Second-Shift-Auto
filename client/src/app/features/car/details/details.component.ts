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
  isBought: boolean = false;
  isBuyer: boolean = false;
  isLoading = true;
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
    if (this.carData?.owner === this.authenticationService.user?.userId) {
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
    this.getCar().subscribe({
      next: (data) => {
        this.carData = data;
        this.carData.additionalImages.push({ url: this.carData?.image });
        this.imageUrl = this.carData?.image;
        this.isLoading = false;
        const isOwner = this.isOwner;
        this.isBought = this.carData?.buyer?.length! > 0;
        if (this.isBought && !isOwner) {
          this.isBuyer = !!this.carData?.buyer?.includes(
            this.authenticationService.user?.userId!
          );
          if (this.isBuyer) {
            this.isBought = true;
          }
        } 
        console.log('isOwner', isOwner);
        console.log('isBuyer', this.isBuyer);
        console.log('isBought', this.isBought);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  changeImage(url: string) {
    this.imageUrl = url;
  }

  getCar() {
    const carId = this.activatedRoute.snapshot.params['carId'];
    return this.carApiService.getCar(carId);
  }

  buyCar(carId: string) {
    const userId = this.authenticationService.user?.userId;
    if (userId) {
      this.carApiService.buyCar(carId, userId).subscribe(() => {
        this.route.navigate([`/cars/details/${carId}`]);
      });
    } else {
      this.route.navigate(['/login']);
    }
  }

  navigateImage(direction: number) {
    const currentIndex = this.carData?.additionalImages.findIndex(
      (img) => img.url === this.imageUrl
    );
    if (currentIndex !== undefined && currentIndex !== null) {
      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < this.carData?.additionalImages.length!) {
        this.imageUrl = this.carData?.additionalImages[nextIndex].url;
      } else {
        const wrapIndex = nextIndex < 0 ? this.carData?.additionalImages.length! - 1 : 0;
        this.imageUrl = this.carData?.additionalImages[wrapIndex].url;
      }
    }
  }
}
