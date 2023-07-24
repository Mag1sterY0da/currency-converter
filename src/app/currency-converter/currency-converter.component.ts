import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  CurrencyExchangeRates,
  ExchangeRate,
} from '../interfaces/IExchangeRate';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnChanges {
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

  @Input() currencyFrom: string = 'UAH';
  @Input() currencyTo: string = 'USD';
  @Input() amountFrom: number = 1;

  exchangeRateFrom: number = 1;
  exchangeRateTo: number = 1;
  amountTo: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.convertCurrencies();
  }

  convertCurrencies() {
    this.exchangeRateTo =
      this.rates[this.currencyFrom as keyof ExchangeRate][
        this.currencyTo as keyof ExchangeRate
      ];
    this.exchangeRateFrom =
      this.rates[this.currencyTo as keyof ExchangeRate][
        this.currencyFrom as keyof ExchangeRate
      ];
    this.amountTo =
      Math.floor(this.amountFrom * this.exchangeRateTo * 100) / 100;
  }

  // Bidirectional conversion
  onCurrencyFromChange() {
    this.convertCurrencies();
  }

  onCurrencyToChange() {
    this.convertCurrencies();
  }

  onAmountFromChange() {
    this.convertCurrencies();
  }

  onAmountToChange() {
    this.amountFrom = this.amountTo / this.exchangeRateTo;
    this.convertCurrencies();
  }
}
