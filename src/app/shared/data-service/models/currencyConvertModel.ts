import { Currencies } from './util';
import { BaseConvertModel } from './baseConvertModel';

export interface CurrencyConvertRequestModel extends BaseConvertModel<Currencies> {
  date?: string;
}

export interface CurrencyConvertResponseModel extends BaseConvertModel<Currencies> {
  date: string;
  converted_amount: number;
  exchange_rate: number;
}
