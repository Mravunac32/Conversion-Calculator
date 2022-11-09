import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrencyRoutingModule } from './currency-routing.module';

@NgModule({
  declarations: [CurrencyComponent],
  imports: [CurrencyRoutingModule, CommonModule, SharedModule]
})
export class CurrencyModule {}
