import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CarRoutingModule } from './car-routing.module';
import { AddCarComponent } from './add-car/add-car.component';



@NgModule({
  declarations: [
    CatalogComponent,
    AddCarComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule
  ]
})
export class CarModule { }
