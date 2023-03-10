import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber, takeUntil } from 'rxjs';

// Normal use case for unsubscribing in ngOnDestroy()
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  observable: Observable<string> = new Observable(
    (subscriber: Subscriber<string>) => {
      subscriber.next('START IN FIRST COMPONENT');
      setTimeout(() => {
        subscriber.next('FINISH IN FIRST COMPONENT');
        subscriber.complete();
      }, 10000);
    }
  );

  ngOnInit(): void {
    this.observable
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => console.log(`%c${value}`, 'color: #bada55'));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('%cDESTROY FIRST COMPONENT', 'color: #bada55');
  }
}
