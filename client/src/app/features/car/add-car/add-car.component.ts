import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';
import { Car, PhotoUrl } from 'src/app/types/car.interface';
import { AuthenticationService } from '../../authentication/authentication.service';
import { sanitizeInput } from '../sanitize-input';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent {
  carForm = this.fb.group({
    make: ['', [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)]],
    model: ['', [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)]],
    price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    engineType: ['', Validators.required],
    power: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    gearbox: ['', Validators.required],
    category: ['', Validators.required],
    mileage: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    color: ['', [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)]],
    location: ['', [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)]],
    description: [
      '',
      [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)],
    ],
    image: ['', [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)]],
    additionalImages: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private carApiService: CarApiService,
    private authenticationService: AuthenticationService,
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
        url: ['', [Validators.required, Validators.pattern(/^[^\s].*[^\s]$/)]],
      })
    );
  }

  removeAdditionalImage(index: number) {
    this.additionalImages.removeAt(index);
  }

  onSubmit() {
    if (this.carForm.valid) {
      let owner: string = this.authenticationService.user?.userId || '';
      const carObj = this.carForm.value as Car;
      sanitizeInput(carObj);
      this.carApiService.createCar(carObj, owner).subscribe((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        this.router.navigate(['/cars/catalog']);
      });
    }
  }
}
