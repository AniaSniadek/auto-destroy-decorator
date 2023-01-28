import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber, takeUntil } from 'rxjs';
import { AutoDestroy } from 'src/_utils/auto-destroy';

// Use case of @AutoDestroy decorator (no need to add ngOnDestroy(), if we have it no need to call next() and complete())
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent implements OnInit {
  @AutoDestroy destroy$: Subject<void> = new Subject<void>();
  observable: Observable<string> = new Observable(
    (subscriber: Subscriber<string>) => {
      subscriber.next('START IN SECOND COMPONENT');
      setTimeout(() => {
        subscriber.next('FINISH IN SECOND COMPONENT');
        subscriber.complete();
      }, 10000);
    }
  );

  ngOnInit(): void {
    this.observable
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: string) =>
        console.log(`%c${value}`, 'color: #33ffe6')
      );
  }
}
