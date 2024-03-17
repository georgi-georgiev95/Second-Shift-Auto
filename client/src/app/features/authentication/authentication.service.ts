import { Injectable, OnDestroy, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRes, UserLogin, UserReg } from 'src/app/types/user.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
export class AuthenticationService{
 
  private handleResponse(res: AuthRes | undefined) {
    if (res?.error) {
      window.alert(res.error);
    } else {
      localStorage.setItem('userData', JSON.stringify(res));
    }
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }
  
  constructor(private http: HttpClient) {}

  login(formData: UserLogin) {
    return this.http
      .post<AuthRes>('/users/login', formData)
      .pipe(tap((res) => this.handleResponse(res)));
  }

  register(formData: UserReg) {
    return this.http
      .post<AuthRes>('/users/register', formData)
      .pipe(tap((res) => this.handleResponse(res)));
  }

  logout() {
    return this.http
      .post<AuthRes>('/users/logout', {})
      .pipe(tap(() => localStorage.clear()));
  }

  
}
