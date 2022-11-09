import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyComponent } from './currency.component';
import { SharedModule } from '../../shared/shared.module';
import { API_KEY, BASE_HREF } from '../../app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Currencies } from '../../shared/data-service/models/util';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [CurrencyComponent],
      providers: [
        { provide: BASE_HREF, useValue: 'baseHref' },
        { provide: API_KEY, useValue: 'apiKey' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test get arrayOfCurrencies', () => {
    expect(component.arrayOfCurrencies).toContain(Currencies.USD);
  });

  it('should test get currencies', () => {
    expect(Object.keys(component.currencies)).toContain(Currencies.USD);
  });

  it('component should render calculator component and check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-calculator').textContent).toContain('Currency Converter');
  });
});
