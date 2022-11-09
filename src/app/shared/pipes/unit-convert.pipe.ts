import { Pipe, PipeTransform } from '@angular/core';
import { ConversionRates, Units } from '../data-service/models/util';
import { UnitConvertRequestModel } from '../data-service/models/unitConvertModel';

@Pipe({
  name: 'unitConvertPipe',
  pure: true
})
export class UnitConvertPipe implements PipeTransform {
  private conversionRates: ConversionRates = {
    [Units.inch]: { [Units.meter]: 0.025, [Units.inch]: 1, [Units.yard]: 0.028 },
    [Units.meter]: { [Units.meter]: 1, [Units.inch]: 39.36, [Units.yard]: 1.094 },
    [Units.yard]: { [Units.meter]: 0.914, [Units.inch]: 36, [Units.yard]: 1 }
  };

  transform(value: UnitConvertRequestModel, ...args: unknown[]): string {
    const convertedAmount = value.base_amount * this.conversionRates[value.base][value.target];
    return `${value.base_amount}${value.base_amount} = ${convertedAmount}${value.target}`;
  }
}
