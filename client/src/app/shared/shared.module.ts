import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CurrencyFormaterPipe } from './pipes/currency-formater.pipe';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoaderComponent,
    CurrencyFormaterPipe,
    ErrorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderComponent,
    CurrencyFormaterPipe,
    ErrorComponent
  ]
})
export class SharedModule { }
