import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from './shared/shared.module';
import { Type } from '@angular/core';
import { DataService } from './shared/data-service/data.service';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'currency', pathMatch: 'full' },
  {
    path: 'currency',
    loadChildren: () => import('./views/currency/currency.module').then((m) => m.CurrencyModule)
  },
  {
    path: 'unit',
    loadChildren: () => import('./views/unit/unit.module').then((m) => m.UnitModule)
  },
  {
    path: '**',
    redirectTo: 'currency',
    pathMatch: 'full'
  }
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ConversionCalculator'`, () => {
    expect(component.title).toEqual('Conversion Calculator');
  });

  it(`should have isMenuOpen false`, () => {
    expect(component.isMenuOpen).toEqual(false);
  });
});
