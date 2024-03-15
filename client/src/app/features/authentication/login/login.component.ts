import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { UserLogin } from 'src/app/types/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private userApiService: UserApiService, private router: Router) {}

  loginUser(): void {
    if (!this.loginForm.valid) {
      return;
    }
    
    const formData = this.loginForm.value;
    this.userApiService.login(formData as UserLogin).subscribe((data) => {
      if (data?.error) {
        window.alert(data.error);
        this.loginForm.reset();
        return;
      }
      this.router.navigate(['/home']);
    });
  }
}
