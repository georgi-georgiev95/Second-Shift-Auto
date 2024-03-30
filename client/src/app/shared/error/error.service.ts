import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ErrorContent } from 'src/app/types/error.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSbj$$ = new BehaviorSubject<ErrorContent | undefined>(undefined);
  errorObj$ = this.errorSbj$$.asObservable();

  error: ErrorContent | undefined;

  constructor(private router: Router) { 
    this.errorObj$.subscribe((error) => {
      this.error = error;
    })
  }

  getError(error: ErrorContent) {
    this.errorSbj$$.next(error);
  }
}
