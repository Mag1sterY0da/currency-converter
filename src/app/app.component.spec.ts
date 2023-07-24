import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface ExchangeRateData {
  conversion_rates: {
    USD: number;
    EUR: number;
  };
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
export class AppComponent implements OnInit {
  exchangeRate: ExchangeRate = { EUR: 0, USD: 0 };
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRate();
  }

  fetchExchangeRate() {
    const apiUrls = [
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/USD/UAH',
      'https://v6.exchangerate-api.com/v6/1ee8c8b9ec1a97c9f0273616/pair/EUR/UAH',
    ];

    forkJoin(
      apiUrls.map((url) => this.http.get<ExchangeRateData>(url))
    ).subscribe(
      (responses) => {
        this.exchangeRate.USD = responses[0].conversion_rates.USD;
        this.exchangeRate.EUR = responses[1].conversion_rates.EUR;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
        this.loading = false;
      }
    );
  }
}
