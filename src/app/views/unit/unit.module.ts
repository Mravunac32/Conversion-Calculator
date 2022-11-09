import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UnitRoutingModule } from './unit-routing.module';
import { UnitComponent } from './unit.component';

@NgModule({
  declarations: [UnitComponent],
  imports: [UnitRoutingModule, CommonModule, SharedModule]
})
export class UnitModule {}
