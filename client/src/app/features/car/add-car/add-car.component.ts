import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}
}
