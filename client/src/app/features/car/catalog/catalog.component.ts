import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Car } from 'src/app/types/car.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allCars: Car[] = [];
  searchForm: FormGroup = this.fb.group({
    make: [''],
    year: [''],
    maxPrice: [''],
    minPrice: [''],
    city: ['']
  })

  constructor(private carApiService: CarApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllCars().subscribe(data => {
      this.allCars = data;
    })
  }
  
  getAllCars () {
    return this.carApiService.getCars();
  }

  filterCars() {
    //
  }
}
