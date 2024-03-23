import { Component } from '@angular/core';
import { Profile } from 'src/app/types/user.interface';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private authenticationService: AuthenticationService) {}
  // userData: Profile = JSON.parse(localStorage.getItem('userData') || '{}');
  userData: Profile = {
    username: this.authenticationService.user?.username || '',
    email: this.authenticationService.user?.email || '',
    userId: this.authenticationService.user?.userId || '',
  };
}
