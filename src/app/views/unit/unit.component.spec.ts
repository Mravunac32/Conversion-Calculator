import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitComponent } from './unit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { API_KEY, BASE_HREF } from '../../app.module';
import { Units } from '../../shared/data-service/models/util';

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [UnitComponent],
      providers: [
        { provide: BASE_HREF, useValue: 'baseHref' },
        { provide: API_KEY, useValue: 'apiKey' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test get arrayOfUnits', () => {
    expect(component.arrayOfUnits).toContain(Units.METER);
  });

  it('should test get units', () => {
    expect(Object.values(component.units)).toContain(Units.YARD);
  });

  it('component should render calculator component and check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-calculator').textContent).toContain('Unit Converter');
  });
});
