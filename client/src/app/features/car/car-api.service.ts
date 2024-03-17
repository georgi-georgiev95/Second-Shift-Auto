import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Car } from 'src/app/types/car.interface';

@Injectable({
  providedIn: 'root',
})
export class CarApiService {
  constructor(private http: HttpClient) {}

  getCars() {
    return this.http
      .get<Car[]>('/cars/catalog');
  }

  createCar(carObj: Car, owner: string) {
    return this.http
      .post<Car>('/cars/create', {carObj, owner})
      .pipe(tap((data) => console.log(data)));
  }
}