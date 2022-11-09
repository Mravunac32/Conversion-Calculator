import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data-service/data.service';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitConvertPipe } from './pipes/unit-convert.pipe';
import { CalculatorComponent } from './ui/calculator/calculator.component';

@NgModule({
  declarations: [UnitConvertPipe, CalculatorComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, CalculatorComponent],
  providers: [DataService]
})
export class SharedModule {}
