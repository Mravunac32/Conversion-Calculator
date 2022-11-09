import { Currencies } from './util';
import { BaseConvertModel } from './baseConvertModel';

export interface ConvertRequestModel extends BaseConvertModel<Currencies> {
  date?: string;
}

export interface ConvertResponseModel extends BaseConvertModel<Currencies> {
  date: string;
  converted_amount: number;
  exchange_rate: number;
}
