import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, tap, filter, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-type-ahead-wip',
  templateUrl: './type-ahead-wip.component.html',
  styleUrls: ['./type-ahead-wip.component.scss']
})
export class TypeAheadWipComponent implements AfterViewInit {

  mapCount = 0;
  switchMapCount = 0;
  mergeMap = 0;

  @ViewChild('search')
  searchInput: ElementRef;

  @ViewChild('questionsContainer')
  questionContainer: ElementRef;

  // tslint:disable-next-line: max-line-length
  private slackApi = (searchText) => `https://api.stackexchange.com/2.2/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&intitle=${searchText}&filter=default`;

  constructor() { }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      filter((searchText) => !!searchText),
      switchMap((searchText) => {
        this.questionContainer.nativeElement.innerHTML = '';
        return ajax(this.slackApi(searchText));
      }),
      mergeMap((response) => response.response.items),
    ).subscribe(
      (question: any) => this.questionContainer.nativeElement.innerHTML += '<br/>' + question.title,
      err => alert(err.message)
    );
  }

}
