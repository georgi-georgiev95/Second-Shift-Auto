import { CurrencyFormaterPipe } from './currency-formater.pipe';

describe('CurrencyFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyFormaterPipe();
    expect(pipe).toBeTruthy();
  });
});
