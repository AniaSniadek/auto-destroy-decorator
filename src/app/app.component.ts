import { ChangeDetectorRef, Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeTab: string = 'first';

  constructor(private _router: Router, private _cdr: ChangeDetectorRef) {
    this._router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.activeTab = event.url.replace(/^\/|\/$/g, '');
        this._cdr.markForCheck();
      });
  }
}
