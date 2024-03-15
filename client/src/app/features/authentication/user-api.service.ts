import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  login(formData: UserLogin) {
    // TODO
    return this.http.post<UserLogin>('/users/login', formData);
  }
}
