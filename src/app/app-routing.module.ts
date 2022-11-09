import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './views/currency/currency.component';
import { UnitComponent } from './views/unit/unit.component';
import { AppComponent } from './app.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
