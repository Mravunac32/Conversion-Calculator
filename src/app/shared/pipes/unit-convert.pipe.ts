import { Pipe, PipeTransform } from '@angular/core';
import { ConversionRates, Units } from '../data-service/models/util';
import { UnitConvertRequestModel } from '../data-service/models/unitConvertModel';

@Pipe({
  name: 'unitConvertPipe',
  pure: true
})
export class UnitConvertPipe implements PipeTransform {
  private conversionRates: ConversionRates = {
    [Units.INCH]: { [Units.METER]: 0.0254, [Units.INCH]: 1, [Units.YARD]: 0.0278 },
    [Units.METER]: { [Units.METER]: 1, [Units.INCH]: 39.3701, [Units.YARD]: 1.0936 },
    [Units.YARD]: { [Units.METER]: 0.9144, [Units.INCH]: 36, [Units.YARD]: 1 }
  };

  transform(value: UnitConvertRequestModel, ...args: unknown[]): string {
    const convertedAmount = (value.base_amount * this.conversionRates[value.base][value.target]).toFixed(2);
    return value.base_amount > 0 ? `${value.base_amount}${value.base} = ${convertedAmount}${value.target}` : '';
  }
}
