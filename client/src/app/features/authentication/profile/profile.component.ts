import { Component } from '@angular/core';
import { Profile } from 'src/app/types/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userData: Profile = JSON.parse(localStorage.getItem('userData') || '{}');

}
