import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { map, filter, switchMap, mergeMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss']
})
export class TypeAheadComponent implements AfterViewInit {

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
      filter((searchText) => !!searchText && searchText.length > 3),
      debounceTime(333),
      distinctUntilChanged(),
      switchMap((searchText) => {
        this.questionContainer.nativeElement.innerHTML = '';
        return ajax(this.slackApi(searchText));
      }),
      catchError(err => of({ response: { items: []}})),
      mergeMap((response) => response.response.items),
    ).subscribe(
      (question: any) => this.questionContainer.nativeElement.innerHTML += '<br/>' + question.title,
      err => alert(err.message),
      () => console.log('done')
    );
  }

}
