import { Injectable, OnDestroy, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRes, UserLogin, UserReg } from 'src/app/types/user.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
export class AuthenticationService{
  private userSbj$$ = new BehaviorSubject<AuthRes | undefined>(undefined);
  userObs$ = this.userSbj$$.asObservable(); 

  user: AuthRes | undefined;

  private handleResponse(res: AuthRes | undefined) {
    if (res?.error) {
      window.alert(res.error);
    } else {
      // localStorage.setItem('userData', JSON.stringify(res));
      this.userSbj$$.next(res);
    }
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }
  
  constructor(private http: HttpClient) {
    this.userObs$.subscribe((user) => {
      this.user = user;
    })

  }

  login(formData: UserLogin) {
    return this.http
      .post<AuthRes>('/api/users/login', formData)
      .pipe(tap((res) => this.handleResponse(res)));
  }

  register(formData: UserReg) {
    return this.http
      .post<AuthRes>('/api/users/register', formData)
      .pipe(tap((res) => this.handleResponse(res)));
  }

  logout() {
    return this.http
      .post<AuthRes>('/api/users/logout', {})
      .pipe(tap(() => this.userSbj$$.next(undefined)));
  }

  
}
