import { Component } from '@angular/core';
import { Units } from '../../shared/data-service/models/util';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  public get arrayOfUnits() {
    return Object.values(Units).map((unit) => String(unit));
  }

  public get units() {
    return Units;
  }
}
