import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CarApiService } from '../car-api.service';
import { Car } from 'src/app/types/car.interface';

@Component({
  selector: 'edit-car',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  carForm: FormGroup;
  carId: string = '';

  constructor(
    private fb: FormBuilder,
    private carApiService: CarApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      engineType: ['', Validators.required],
      power: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gearbox: ['', Validators.required],
      category: ['', Validators.required],
      mileage: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      color: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      additionalImages: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.carId = this.activatedRoute.snapshot.params['carId'];
    this.fetchCarData(this.carId as string);
  }

  fetchCarData(carId: string) {
    // Fetch car data from the API based on carId
    this.carApiService.getCar(carId).subscribe((data: Car) => {
      this.populateForm(data);
    });
  }

  get additionalImages(): FormArray {
    return this.carForm.get('additionalImages') as FormArray;
  }

  addAdditionalImage() {
    if (this.additionalImages.length === 4) {
      window.alert('Cannot add more than 4 images');
      return;
    }
    this.additionalImages.push(
      this.fb.group({
        url: ['', Validators.required],
      })
    );
  }

  removeAdditionalImage(index: number) {
    this.additionalImages.removeAt(index);
  }
  
  populateForm(carData: Car) {
    this.carForm.patchValue({
      make: carData.make,
      model: carData.model,
      price: carData.price,
      year: carData.year,
      engineType: carData.engineType,
      power: carData.power,
      gearbox: carData.gearbox,
      category: carData.category,
      mileage: carData.mileage,
      color: carData.color,
      location: carData.location,
      description: carData.description,
      image: carData.image,
    });

    // Populate additional images
    carData.additionalImages.forEach((image) => {
      this.paginateImages(image.url);
    });
  }

  paginateImages(image: string) {
    this.additionalImages.push(
      this.fb.group({
        url: [image, Validators.required],
      })
    );
  }
  // Similar methods for adding and removing additional images as in the AddCarComponent

  onSubmit() {
    if (this.carForm.valid) {
      let owner: string = JSON.parse(
        localStorage.getItem('userData') || '{}'
      ).userId;
      const carObj = this.carForm.value as unknown as Car;
      this.carApiService.updateCar(carObj, owner, this.carId).subscribe((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        console.log(data);
        this.router.navigate([`/cars/details/${this.carId}`]);
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid!');
    }
  }
}
