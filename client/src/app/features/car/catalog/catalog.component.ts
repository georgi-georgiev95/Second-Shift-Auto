import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Car } from 'src/app/types/car.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  selectedImage = '';
  isLoading = true;
  isZoomed = false;
  allCars: Car[] = [];
  result: boolean = false;
  formChangesSubscription: Subscription | undefined;
  searchForm: FormGroup = this.fb.group({
    make: [''],
    year: [''],
    maxPrice: [''],
    minPrice: [''],
    city: [''],
  });

  constructor(
    private carApiService: CarApiService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.result = true;
  }

  zoomPhoto(photoCover: HTMLImageElement) {
    this.isZoomed = !this.isZoomed;
    if (this.isZoomed) {
      this.selectedImage = photoCover.src;
    } 
  }

  ngOnInit(): void {
    this.getAllCars().subscribe((data) => {
      this.allCars = data;
      if (data.length === 0) {
        this.result = false;
      } else {
        this.result = true;
      }
      this.isLoading = false;
    });

    this.formChangesSubscription = this.searchForm.valueChanges.subscribe(
      () => {
        this.filterCars();
      }
    );
  }

  getAllCars() {
    return this.carApiService.getCars();
  }

  filterCars() {
    return this.carApiService
      .getSearchedCars(
        this.searchForm.value.make,
        this.searchForm.value.year,
        this.searchForm.value.maxPrice,
        this.searchForm.value.minPrice,
        this.searchForm.value.city
      )
      .subscribe((data) => {
        this.allCars = data;
        if (data.length === 0) {
          this.result = false;
        } else {
          this.result = true;
        }
      });
  }
}
