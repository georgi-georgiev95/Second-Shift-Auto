import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CarRoutingModule } from './car-routing.module';
import { AddCarComponent } from './add-car/add-car.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CatalogComponent,
    AddCarComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CarModule { }
