import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  
  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn;
  }

  logout(): void {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/users/login']);
    });
  }
}
