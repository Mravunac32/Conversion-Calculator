enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  CAD = 'CAD',
  AUD = 'AUD',
  GBP = 'GBP',
  BRL = 'BRL'
}
enum Units {
  METER = 'm',
  YARD = 'yd',
  INCH = 'in'
}

type ConversionRates = {
  [k in Units]: { [k1 in Units]: number };
};

export { Currencies, Units, ConversionRates };
