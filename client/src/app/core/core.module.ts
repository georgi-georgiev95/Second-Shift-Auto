import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    AuthenticateComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    AuthenticateComponent
  ]
})
export class CoreModule { }
