import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordValidator } from 'src/app/shared/validators/password-match.validator';
import { AuthenticationService } from '../authentication.service';
import { UserReg } from 'src/app/types/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: string | undefined;
  registerForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.email],
    ],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  registerUser(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const formData = this.registerForm.value;

    this.authenticationService
      .register(formData as UserReg)
      .subscribe((data) => {
        if (data?.error) {
          this.registerForm.patchValue({
            passGroup: {
              password: '',
              rePassword: '',
            },
          })
          return;
        }
        this.router.navigate(['/home']);
      });
  }
}
