import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiveRequestModel, LiveResponseModel } from './models/liveModel';
import { distinctUntilChanged, Observable, share, shareReplay } from 'rxjs';
import { API_KEY, BASE_HREF } from '../../app.module';
import { Currencies } from './models/currencies';
import { ConvertRequestModel, ConvertResponseModel } from './models/convertModel';

@Injectable()
export class DataService {
  constructor(
    @Inject(API_KEY) private apiKey: string,
    @Inject(BASE_HREF) private baseHref: string,
    private httpClient: HttpClient
  ) {}

  public getCurrency(reqParams: LiveRequestModel): Observable<LiveResponseModel> {
    const { base, target } = reqParams;
    let url = `${this.baseHref}live?api_key=${this.apiKey}&base=${base}`;
    if (!!target) {
      url = url.concat(`&target=${target}`);
    }
    return this.httpClient.get<LiveResponseModel>(url);
  }

  public convertCurrency(reqParams: ConvertRequestModel): Observable<ConvertResponseModel> {
    const { base, target, base_amount, date } = reqParams;
    let url = `${this.baseHref}convert?api_key=${this.apiKey}&base=${base}&target=${target}&base_amount=${base_amount}`;
    if (!!date) {
      url = url.concat(`&date=${date}`);
    }
    return this.httpClient.get<ConvertResponseModel>(url);
  }
}
