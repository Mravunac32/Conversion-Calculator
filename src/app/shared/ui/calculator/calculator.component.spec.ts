import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent, SelectedOption } from './calculator.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../data-service/data.service';
import { API_KEY, BASE_HREF } from '../../../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Currencies, Units } from '../../data-service/models/util';
import { debounceTime, of, switchMap } from 'rxjs';
import {
  CurrencyConvertRequestModel,
  CurrencyConvertResponseModel
} from '../../data-service/models/currencyConvertModel';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  let mockedDataService = {
    convertCurrency: (reqParams: CurrencyConvertRequestModel) => of(mockedResponse)
  };

  let mockedResponse: CurrencyConvertResponseModel = {
    base: Currencies.EUR,
    target: Currencies.USD,
    base_amount: 120,
    converted_amount: 445,
    date: '123',
    exchange_rate: 11
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [CalculatorComponent],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        { provide: DataService, useValue: mockedDataService },
        { provide: BASE_HREF, useValue: 'baseHref' },
        { provide: API_KEY, useValue: 'apiKey' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form group and default value setup', () => {
    component.toValue = Currencies.EUR;
    component.fromValue = Currencies.USD;
    component.baseValue = 120;
    component.options = ['USD', 'EUR'];

    component.setupDefaultValues();
    fixture.detectChanges();

    expect(component.fromValue).toEqual(Currencies.USD);
    expect(component.toValue).toEqual(Currencies.EUR);
    expect(component.baseValue).toEqual(120);
    expect(component.options).toEqual(['USD', 'EUR']);

    expect(component.formGroup).toBeTruthy();
    expect(component.base).toEqual(Currencies.USD);
    expect(component.target).toEqual(Currencies.EUR);
    expect(component.baseAmount).toEqual(120);
    expect(component.inverted).toBe(false);
  });

  it('should test isBaseAmountValid', () => {
    component.baseAmount = 120;
    component.setupDefaultValues();
    fixture.detectChanges();

    expect(component.isBaseAmountValid()).toBeTruthy();

    component.baseAmount = 0;
    fixture.detectChanges();

    expect(component.isBaseAmountValid()).toBeFalsy();
  });

  it('should test inverted setter and getter', () => {
    expect(component.inverted).toBeFalsy();

    component.inverted = true;
    fixture.detectChanges();

    expect(component.inverted).toBeTruthy();
  });

  it('should test base setter and getter', () => {
    expect(component.base).toBeFalsy();

    component.inverted = false;
    component.base = Currencies.EUR;
    component.target = Currencies.USD;
    fixture.detectChanges();

    expect(component.base).toEqual(Currencies.EUR);
    expect(component.target).toEqual(Currencies.USD);

    component.inverted = true;
    component.base = Currencies.EUR;
    component.target = Currencies.USD;
    fixture.detectChanges();
    expect(component.target).toEqual(Currencies.USD);
    expect(component.base).toEqual(Currencies.EUR);
  });

  it('should test target setter and getter', () => {
    expect(component.target).toBeFalsy();

    component.inverted = false;
    component.target = Currencies.EUR;
    component.base = Currencies.USD;
    fixture.detectChanges();

    expect(component.base).toEqual(Currencies.USD);
    expect(component.target).toEqual(Currencies.EUR);

    component.inverted = true;
    component.target = Currencies.EUR;
    component.base = Currencies.USD;
    fixture.detectChanges();
    expect(component.base).toEqual(Currencies.USD);
    expect(component.target).toEqual(Currencies.EUR);
  });

  it('should test baseAmount setter and getter', () => {
    expect(component.baseAmount).toBeFalsy();

    component.baseAmount = 124;
    fixture.detectChanges();

    expect(component.baseAmount).toEqual(124);
  });

  it('should test isCurrencySelected', () => {
    component.options = ['USD', 'EUR'];
    component.setupDefaultValues();
    fixture.detectChanges();

    expect(component.isCurrencySelected()).toBeTruthy();
    expect((component as any)._selectedOption).toEqual(SelectedOption.Currency);

    component.options = ['m', 'yd'];
    component.setupDefaultValues();
    fixture.detectChanges();

    expect(component.inverted).toBeFalsy();
    expect((component as any)._selectedOption).toEqual(SelectedOption.Unit);
  });

  it('should test calculatedResult$', (done) => {
    component.calculatedResult$ = of('test');
    fixture.detectChanges();
    component.calculatedResult$?.subscribe((res) => {
      expect(res).toEqual('test');
      done();
    });
  });

  it('should test formValueChanges on currency conversion', (done) => {
    component.base = Currencies.EUR;
    component.target = Currencies.USD;
    component.baseAmount = 120;
    component.options = ['USD', 'EUR'];
    component.setupDefaultValues();
    fixture.detectChanges();

    component.calculatedResult$ = component.formGroup.valueChanges.pipe(
      debounceTime(250),
      switchMap(() => {
        if (component.isCurrencySelected()) {
          return of('currency conversion');
        }
        return of('unit conversion');
      })
    );

    component.calculatedResult$.subscribe((res) => {
      expect(res).toEqual('currency conversion');
      done();
    });

    component.base = Currencies.EUR;
    fixture.detectChanges();
  });

  it('should test formValueChanges on unit conversion', (done) => {
    component.base = Units.YARD;
    component.target = Units.METER;
    component.baseAmount = 120;
    component.options = ['m', 'yd'];
    component.setupDefaultValues();
    fixture.detectChanges();

    component.calculatedResult$ = component.formGroup.valueChanges.pipe(
      debounceTime(250),
      switchMap(() => {
        if (component.isCurrencySelected()) {
          return of('currency conversion');
        }
        return of('unit conversion');
      })
    );

    component.calculatedResult$.subscribe((res) => {
      expect(res).toEqual('unit conversion');
      done();
    });

    component.base = Units.INCH;
    fixture.detectChanges();
  });

  it('should test formValueChanges on unit conversion with real pipe', (done) => {
    component.base = Units.YARD;
    component.target = Units.METER;
    component.baseAmount = 120;
    component.options = ['m', 'yd'];
    component.setupDefaultValues();
    component.ngOnInit();
    fixture.detectChanges();

    component.calculatedResult$?.subscribe((res) => {
      expect(res).toEqual('120in = 3.05m');
      done();
    });

    component.base = Units.INCH;
    fixture.detectChanges();
  });

  it('should test formValueChanges on currency conversion with mocked dataservice', (done) => {
    component.base = Currencies.EUR;
    component.target = Currencies.USD;
    component.baseAmount = 120;
    component.options = ['USD', 'EUR'];
    component.setupDefaultValues();
    component.ngOnInit();
    fixture.detectChanges();

    component.calculatedResult$?.subscribe((res) => {
      expect(res).toContain('€120.00');
      done();
    });

    component.base = Currencies.EUR;
    fixture.detectChanges();
  });
});
