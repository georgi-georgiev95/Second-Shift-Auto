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
    return this.http.get<Car[]>('/api/cars/catalog');
  }

  getCar(carId: string) {
    return this.http.get<Car>(`/api/cars/details/${carId}`);
  }

  getUserCars(userId: string) {
    return this.http.get<Car[]>(`/api/cars/user/${userId}`);
  }

  getBoughtCars(userId: string) {
    return this.http.get<Car[]>(`/api/users/profile/boughtCars`);
  }

  createCar(carObj: Car, owner: string) {
    return this.http
      .post<Car>('/api/cars/create', { carObj, owner })
      .pipe(tap((data) => console.log(data)));
  }

  updateCar(carObj: Car, owner: string, carId: string) {
    return this.http
      .post<Car>(`/api/cars/details/${carId}/edit`, { carObj, owner })
      .pipe(tap((data) => console.log(data)));
  }

  deleteCar(carId: string | undefined) {
    return this.http
      .delete<Car>(`/api/cars/details/${carId}/delete`)
      .pipe(tap((data) => console.log(data)));
  }

  getSearchedCars(
    make: string,
    year: string,
    maxPrice: string,
    minPrice: string
  ) {
    return this.http.get<Car[]>('/api/cars/search', {
      params: { make, year, maxPrice, minPrice },
    });
  }

  buyCar(carId: string, buyerId: string) {
    return this.http
      .post<Car>(`/api/cars/details/${carId}/buy`, { buyerId })
      .pipe(tap((data) => console.log(data)));
  }

}
