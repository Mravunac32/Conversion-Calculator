import { UnitConvertPipe } from './unit-convert.pipe';
import { Units } from '../data-service/models/util';

describe('UnitConvertPipePipe', () => {
  const pipe = new UnitConvertPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test conversionRates', () => {
    expect((pipe as any).conversionRates).toBeTruthy();
  });

  it('should test transform', () => {
    const transformObject = {
      base: Units.YARD,
      target: Units.METER,
      base_amount: 1
    };
    expect(pipe.transform(transformObject)).toEqual('1yd = 0.91m');
  });
});
