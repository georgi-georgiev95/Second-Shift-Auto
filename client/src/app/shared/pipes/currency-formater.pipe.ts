import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormater'
})
export class CurrencyFormaterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
