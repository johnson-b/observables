import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, fromEvent, interval } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements AfterViewInit {

  @ViewChild('startButton')
  startButton: ElementRef;

  @ViewChild('stopButton')
  stopButton: ElementRef;

  @ViewChild('timerContainer')
  timerContainer: ElementRef;

  start$: Observable<any>;
  stop$: Observable<any>;
  tick$: Observable<any>;

  constructor() {
    this.tick$ = interval(100);
  }

  ngAfterViewInit() {
    this.start$ = fromEvent(this.startButton.nativeElement, 'click');
    this.stop$ = fromEvent(this.stopButton.nativeElement, 'click');

    this.start$.subscribe(() => {
      this.tick$.pipe(
        map((val) => (val / 10).toFixed(1)),
        takeUntil(this.stop$)
      ).subscribe((num) => this.timerContainer.nativeElement.innerText = num);
    });
  }

}
