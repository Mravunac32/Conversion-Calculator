import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../data-service/data-service.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [DataServiceService],
})
export class SharedModule {}
