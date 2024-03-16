import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRes, UserLogin, UserReg } from 'src/app/types/user.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user$$ = new BehaviorSubject<AuthRes | undefined>(undefined); 
  // user$ = this.user$$.asObservable();
  
  get isLoggedIn() {
    return !!this.user$$.value
  }

  constructor(private http: HttpClient) {

   }

  login(formData: UserLogin) {
    return this.http
      .post<AuthRes>('/users/login', formData)
      .pipe(tap((user) => {
        if (user?.error) {
          window.alert(user.error);
          this.user$$.next(undefined);
          return;
        }

        this.user$$.next(user);
      }));
  }

  register(formData: UserReg) {
    return this.http
      .post<AuthRes>('/users/register', formData)
      .pipe(tap((user) => {
        if (user?.error) {
          window.alert(user.error);
          this.user$$.next(undefined);
          return;
        }

        this.user$$.next(user);
      }));
  }

  logout() {
    return this.http
      .post<AuthRes>('/users/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }
}
