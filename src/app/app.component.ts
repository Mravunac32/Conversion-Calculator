import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Conversion Calculator';
  isMenuOpen: boolean = false;

  constructor() {}

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
