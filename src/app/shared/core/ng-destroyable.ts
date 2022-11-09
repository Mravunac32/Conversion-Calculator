import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, first } from 'rxjs';

@Directive()
export abstract class NgDestroyable implements OnDestroy {
  private _destroyed$ = new BehaviorSubject<boolean>(false);
  protected destroyed$ = this._destroyed$.pipe(filter((value): value is true => value)).pipe(first());
  protected get destroyed() {
    return this._destroyed$.value;
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
  }
}
