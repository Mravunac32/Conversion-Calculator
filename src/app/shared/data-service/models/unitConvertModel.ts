import { BaseConvertModel } from './baseConvertModel';
import { Units } from './util';

export interface UnitConvertRequestModel extends BaseConvertModel<Units> {}
export interface UnitConvertResponseModel extends BaseConvertModel<Units> {
  converted_amount: number;
}
