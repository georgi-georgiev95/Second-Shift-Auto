import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormater',
})
export class CurrencyFormaterPipe implements PipeTransform {
  transform(value: number): string {
    // Convert number to string
    let strNumber = value.toString();

    // Regular expression to insert commas
    strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return strNumber;
  }
}
