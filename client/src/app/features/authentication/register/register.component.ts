import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]]
    },
    {
      validators: [matchPasswordValidator('password', 'rePassword')]
    })
  });

  constructor(private fb: FormBuilder) { }
  
  registerUser(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
