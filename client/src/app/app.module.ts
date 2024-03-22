import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { FeaturesModule } from './features/features.module';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticationService } from './features/authentication/authentication.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FeaturesModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
