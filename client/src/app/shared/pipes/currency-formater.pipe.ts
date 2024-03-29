import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormater',
})
export class CurrencyFormaterPipe implements PipeTransform {
  transform(value: string | number): string {
    // Convert number to string
    if (typeof value === 'number') {
      value = value.toString();
    }
    // Regular expression to insert commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return value;
  }
}
