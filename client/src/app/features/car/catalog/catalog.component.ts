import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Car } from 'src/app/types/car.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allCars: Car[] = [];

  constructor(private carApiService: CarApiService) { }

  ngOnInit(): void {
    this.getAllCars().subscribe(data => {
      this.allCars = data;
    })
  }
  
  getAllCars () {
    return this.carApiService.getCars();
  }
}
