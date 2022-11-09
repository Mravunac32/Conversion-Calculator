import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  host: {
    role: 'main',
    class: 'c-unit',
  },
})
export class UnitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
