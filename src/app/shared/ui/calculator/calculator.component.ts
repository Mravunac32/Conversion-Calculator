import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { UnitConvertPipe } from '../../pipes/unit-convert.pipe';
import { Currencies, Units } from '../../data-service/models/util';
import {
  debounceTime,
  from,
  iif,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  withLatestFrom
} from 'rxjs';
import { NgDestroyable } from '../../core/ng-destroyable';
import {
  CurrencyConvertRequestModel,
  CurrencyConvertResponseModel
} from '../../data-service/models/currencyConvertModel';
import { DataService } from '../../data-service/data.service';
import { UnitConvertRequestModel } from '../../data-service/models/unitConvertModel';

enum FormControls {
  Base = 'base',
  Target = 'target',
  Inverted = 'inverted',
  BaseAmount = 'baseAmount'
}

export enum SelectedOption {
  Currency,
  Unit
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  host: {
    role: 'main',
    class: 'c-calculator'
  },
  providers: [CurrencyPipe, UnitConvertPipe]
})
export class CalculatorComponent extends NgDestroyable implements OnInit {
  public formGroup: FormGroup;
  public calculatedResult$?: Observable<string>;

  @Input() options?: String[];
  @Input() fromValue?: Currencies | Units;
  @Input() toValue?: Currencies | Units;
  @Input() baseValue?: number;

  private _selectedOption?: SelectedOption;

  public get base(): Currencies | Units {
    return !this.inverted
      ? this.formGroup.get(FormControls.Base)?.value
      : this.formGroup.get(FormControls.Target)?.value;
  }

  public set base(value: Currencies | Units) {
    !this.inverted
      ? this.formGroup.get(FormControls.Base)?.setValue(value)
      : this.formGroup.get(FormControls.Target)?.setValue(value);
  }

  public set target(value: Currencies | Units) {
    !this.inverted
      ? this.formGroup.get(FormControls.Target)?.setValue(value)
      : this.formGroup.get(FormControls.Base)?.setValue(value);
  }

  public get target(): Currencies | Units {
    return !this.inverted
      ? this.formGroup.get(FormControls.Target)?.value
      : this.formGroup.get(FormControls.Base)?.value;
  }

  public get inverted(): boolean {
    return this.formGroup.get(FormControls.Inverted)?.value;
  }

  public set inverted(value: boolean) {
    this.formGroup.get(FormControls.Inverted)?.setValue(value);
  }

  public get baseAmount(): number {
    return this.formGroup.get(FormControls.BaseAmount)?.value;
  }

  public set baseAmount(value: number) {
    this.formGroup.get(FormControls.BaseAmount)?.setValue(value);
  }

  public isBaseAmountValid(): boolean | undefined {
    return this.formGroup.get(FormControls.BaseAmount)?.valid;
  }

  constructor(
    private currencyPipe: CurrencyPipe,
    private unitConvertPipe: UnitConvertPipe,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    super();

    this.formGroup = this.formBuilder.group({
      base: [null, Validators.required],
      target: [null, Validators.required],
      baseAmount: [null, [Validators.required, Validators.min(1)]],
      inverted: [false]
    });
  }

  public setupDefaultValues() {
    if (this.fromValue) {
      this.base = this.fromValue;
    }

    if (this.toValue) {
      this.target = this.toValue;
    }

    if (this.baseValue) {
      this.baseAmount = this.baseValue;
    }

    this._selectedOption = this.options?.includes(Currencies.USD) ? SelectedOption.Currency : SelectedOption.Unit;
  }

  public isCurrencySelected(): boolean {
    return this._selectedOption === SelectedOption.Currency;
  }

  private currencyCalculation$(): Observable<string> {
    return this.dataService
      .convertCurrency({
        base: this.base,
        target: this.target,
        base_amount: this.baseAmount
      } as CurrencyConvertRequestModel)
      .pipe(
        take(1),
        map((result: CurrencyConvertResponseModel) => {
          return `${this.currencyPipe.transform(this.baseAmount, this.base)} &rarr;
                ${this.currencyPipe.transform(result.converted_amount, this.target)}`;
        }),
        shareReplay(1)
      );
  }

  private unitCalculation$(): Observable<string> {
    return of(
      this.unitConvertPipe.transform({
        base: this.base,
        target: this.target,
        base_amount: this.isBaseAmountValid() ? this.baseAmount : 0
      } as UnitConvertRequestModel)
    );
  }

  ngOnInit(): void {
    this.setupDefaultValues();

    this.calculatedResult$ = this.formGroup.valueChanges.pipe(
      debounceTime(250),
      switchMap(() => {
        if (this.isCurrencySelected()) {
          return this.currencyCalculation$();
        }
        return this.unitCalculation$();
      }),
      takeUntil(this.destroyed$)
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
