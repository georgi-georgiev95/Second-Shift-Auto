import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CurrencyFormaterPipe } from './pipes/currency-formater.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    CurrencyFormaterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
