import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { UnitConvertPipe } from '../../pipes/unit-convert.pipe';
import { Currencies, Units } from '../../data-service/models/util';
import { Observable } from 'rxjs';
import { NgDestroyable } from '../../core/ng-destroyable';

enum FormControls {
  Base = 'base',
  Target = 'target',
  Inverted = 'inverted',
  BaseAmount = 'baseAmount'
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
  @Input() options?: Currencies | Units;

  @Input() fromValue?: Currencies | Units;
  @Input() toValue?: Currencies | Units;
  @Input() baseValue?: number;

  public calculatedResult$?: Observable<string>;

  public get base(): Units {
    return !this.inverted
      ? this.formGroup.get(FormControls.Base)?.value
      : this.formGroup.get(FormControls.Target)?.value;
  }

  public get target(): Units {
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

  public isBaseAmountValid(): boolean | undefined {
    return this.formGroup.get(FormControls.BaseAmount)?.valid;
  }

  constructor(
    private currencyPipe: CurrencyPipe,
    private unitConvertPipe: UnitConvertPipe,
    private formBuilder: FormBuilder
  ) {
    super();

    this.formGroup = this.formBuilder.group({
      base: [this.fromValue, Validators.required],
      target: [this.toValue, Validators.required],
      baseAmount: [this.baseValue, [Validators.required, Validators.min(1)]],
      inverted: [false]
    });
  }

  ngOnInit(): void {}

  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
