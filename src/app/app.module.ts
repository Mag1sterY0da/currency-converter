import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrencyHeaderComponent } from './currency-header/currency-header.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyHeaderComponent,
    CurrencyConverterComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
