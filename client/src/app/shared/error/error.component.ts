import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { ErrorContent } from 'src/app/types/error.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error: ErrorContent | undefined;
  constructor(private errorService: ErrorService) {
    this.errorService.errorObj$.subscribe((error) => {
      this.error = error;
    })
  }
  ngOnInit(): void {
    this.error = undefined;
  }
}
