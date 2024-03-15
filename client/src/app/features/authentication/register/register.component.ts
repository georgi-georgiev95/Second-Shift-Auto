import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: '',
    email: '',
    passGroup: this.fb.group({
      password: '',
      rePassword: ''
    })
  });

  constructor(private fb: FormBuilder){}
}
