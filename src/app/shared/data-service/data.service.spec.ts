import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyConvertRequestModel, CurrencyConvertResponseModel } from './models/currencyConvertModel';
import { Currencies } from './models/util';
import { API_KEY, BASE_HREF } from '../../app.module';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService, { provide: BASE_HREF, useValue: 'baseHref' }, { provide: API_KEY, useValue: 'apiKey' }]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<CurrencyConvertResponseModel>', () => {
    const conversionRequest: CurrencyConvertRequestModel = {
      base: Currencies.USD,
      target: Currencies.EUR,
      base_amount: 4
    };

    const conversionResponse: CurrencyConvertResponseModel = {
      base: Currencies.USD,
      target: Currencies.EUR,
      base_amount: 4,
      converted_amount: 10,
      exchange_rate: 2.5,
      date: '1232'
    };

    service.convertCurrency(conversionRequest).subscribe((response) => {
      expect(response).toEqual(conversionResponse);
    });

    const { base, target, base_amount } = conversionRequest;
    const req = httpMock.expectOne(
      `baseHrefconvert?api_key=apiKey&base=${base}&target=${target}&base_amount=${base_amount}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(conversionResponse);
  });

  it('should return an Observable<CurrencyConvertResponseModel>, but called with date', () => {
    const conversionRequest: CurrencyConvertRequestModel = {
      base: Currencies.USD,
      target: Currencies.EUR,
      base_amount: 4,
      date: '1234'
    };

    const conversionResponse: CurrencyConvertResponseModel = {
      base: Currencies.USD,
      target: Currencies.EUR,
      base_amount: 4,
      converted_amount: 10,
      exchange_rate: 2.5,
      date: '1232'
    };

    service.convertCurrency(conversionRequest).subscribe((response) => {
      expect(response).toEqual(conversionResponse);
    });

    const { base, target, base_amount, date } = conversionRequest;
    const req = httpMock.expectOne(
      `baseHrefconvert?api_key=apiKey&base=${base}&target=${target}&base_amount=${base_amount}&date=${date}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(conversionResponse);
  });
});
