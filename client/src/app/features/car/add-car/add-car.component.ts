import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';
import { Car } from 'src/app/types/car.interface';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent {
  carForm = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private carApiService: CarApiService,
    private router: Router
  ) {}

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

  onSubmit() {
    if (this.carForm.valid) {
      debugger;
      let owner: string = JSON.parse(localStorage.getItem('userData') || '{}').userId;
      const carObj = this.carForm.value as unknown as Car;
      this.carApiService.createCar(carObj, owner).subscribe((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        this.router.navigate(['/cars/catalog']);
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid!');
    }
  }
}
