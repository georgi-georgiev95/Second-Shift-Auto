import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/types/car.interface';

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
    private activatedRoute: ActivatedRoute
  ) {}

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
