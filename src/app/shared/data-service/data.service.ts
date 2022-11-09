import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { API_KEY, BASE_HREF } from '../../app.module';
import { CurrencyConvertRequestModel, CurrencyConvertResponseModel } from './models/currencyConvertModel';

@Injectable()
export class DataService {
  constructor(
    @Inject(API_KEY) private apiKey: string,
    @Inject(BASE_HREF) private baseHref: string,
    private httpClient: HttpClient
  ) {}

  public convertCurrency(reqParams: CurrencyConvertRequestModel): Observable<CurrencyConvertResponseModel> {
    const { base, target, base_amount, date } = reqParams;
    let url = `${this.baseHref}convert?api_key=${this.apiKey}&base=${base}&target=${target}&base_amount=${base_amount}`;
    if (!!date) {
      url = url.concat(`&date=${date}`);
    }
    return base_amount > 0 ? this.httpClient.get<CurrencyConvertResponseModel>(url) : NEVER;
  }
}
