import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AuthenticateComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    HeaderComponent,
    AuthenticateComponent
  ]
})
export class CoreModule { }
