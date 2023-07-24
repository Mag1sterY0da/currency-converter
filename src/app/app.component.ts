import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CurrencyExchangeRates } from './interfaces/IExchangeRate';

interface ExchangeRateData {
  conversion_rate: number;
}

interface ExchangeRate {
  EUR: number;
  USD: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'currency-converter';

  rates: CurrencyExchangeRates = {
    UAH: {
      UAH: 1,
      USD: 0,
      EUR: 0,
    },
    USD: {
      UAH: 0,
      USD: 1,
      EUR: 0,
    },
    EUR: {
      UAH: 0,
      USD: 0,
      EUR: 1,
    },
  };
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRate();
  }

  fetchExchangeRate() {
    const apiUrls = [
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/USD/UAH',
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/EUR/UAH',
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/UAH/EUR',
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/USD/EUR',
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/UAH/USD',
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/EUR/USD',
    ];

    forkJoin(
      apiUrls.map((url) => this.http.get<ExchangeRateData>(url))
    ).subscribe(
      (responses) => {
        this.rates.USD.UAH = responses[0].conversion_rate;
        this.rates.EUR.UAH = responses[1].conversion_rate;
        this.rates.UAH.EUR = responses[2].conversion_rate;
        this.rates.USD.EUR = responses[3].conversion_rate;
        this.rates.UAH.USD = responses[4].conversion_rate;
        this.rates.EUR.USD = responses[5].conversion_rate;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
        this.loading = false;
      }
    );
  }
}
