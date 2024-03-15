import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: '',
    password: ''
  })

  constructor(private fb: FormBuilder) { }
  
  loginUser(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
