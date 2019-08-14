import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-type-ahead-visual',
  templateUrl: './type-ahead-visual.component.html',
  styleUrls: ['./type-ahead-visual.component.scss'],
  animations: [
    trigger('slideRight', [
      transition('void => *',
        animate('3000ms', keyframes([
          style({ left: 0, opacity: 1, offset: 0 }),
          style({ left: '99%', opacity: 1, offset: .99 }),
          style({ left: '100%', opacity: 0, display: 'none', offset: 1.0 })
        ]))
      )
    ])
  ]
})
export class TypeAheadVisualComponent implements OnInit {

  @Input()
  collection: any[];

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
    console.log('COLLECTION', this.collection);
  }
}
