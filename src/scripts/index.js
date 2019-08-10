import { fromEvent, interval } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import '../styles/index.scss';

(function() {
  class Timer {
    
    constructor() {
      this.startButton = document.querySelector('#start-button');
      this.stopButton = document.querySelector('#stop-button');
      this.timerContainer = document.querySelector('.timer-container');

      this.start$ = fromEvent(this.startButton, 'click');
      this.stop$ = fromEvent(this.stopButton, 'click');

      this.ticks$ = interval(100);
      this.init();
    }
    
    init() {
      this.start$.subscribe(() => {
        this.ticks$.pipe(
          map((val) => (val / 10).toFixed(1)),
          takeUntil(this.stop$)
        ).subscribe((num) => this.timerContainer.innerText = num); 
      });
    }

  }

  new Timer();
})();
