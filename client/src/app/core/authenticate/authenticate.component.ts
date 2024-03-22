import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit(): void {
    this.authenticationService.getUserProfile().subscribe({
      next: () => { this.isAuthenticating = false; },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => { this.isAuthenticating = false; }
    });
  }
}
