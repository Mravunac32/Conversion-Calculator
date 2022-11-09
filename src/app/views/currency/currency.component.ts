import { Component } from '@angular/core';
import { Currencies } from '../../shared/data-service/models/util';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  public get arrayOfCurrencies() {
    return Object.values(Currencies).map((currency) => String(currency));
  }

  public get currencies() {
    return Currencies;
  }
}
