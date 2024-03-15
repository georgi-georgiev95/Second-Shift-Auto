import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterLink } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AuthenticationModule
  ]
})
export class FeaturesModule { }
