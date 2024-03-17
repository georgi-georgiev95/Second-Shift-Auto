import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AuthActivate } from 'src/app/core/guards/auth.guard';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'sell',
    component: AddCarComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'details/:carId',
    component: DetailsComponent,
  },
  {
    path: 'details/:carId/edit',
    component: EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}
