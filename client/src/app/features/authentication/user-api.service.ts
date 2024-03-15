import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserReg } from 'src/app/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  login(formData: UserLogin) {
    return this.http.post<UserLogin>('/users/login', formData);
  }

  register(formData: UserReg) {
    return this.http.post<UserReg>('/users/register', formData);
  }
}
