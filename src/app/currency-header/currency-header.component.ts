import { Component, Input } from '@angular/core';
import { CurrencyExchangeRates } from '../interfaces/IExchangeRate';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.css'],
})
export class CurrencyHeaderComponent {
  @Input() rates: CurrencyExchangeRates = {
    UAH: {
      UAH: 1,
      USD: 0,
      EUR: 0,
    },
    USD: {
      UAH: 0,
      USD: 0,
      EUR: 0,
    },
    EUR: {
      UAH: 0,
      USD: 0,
      EUR: 1,
    },
  };
}
