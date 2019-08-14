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

  @ViewChild('search')
  searchInput: ElementRef;

  @ViewChild('questionsContainer')
  questionContainer: ElementRef;

  keyUps: any[] = [];
  filters: any[] = [];
  results: any[] = [];
  questions: any[] = [];

  // tslint:disable-next-line: max-line-length
  private slackApi = (searchText) => `https://api.stackexchange.com/2.2/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&intitle=${searchText}&filter=default`;

  constructor() { }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      tap(() => this.keyUps.push('')),
      filter((searchText) => !!searchText),
      tap(() => this.filters.push('')),
      switchMap((searchText) => {
        this.questionContainer.nativeElement.innerHTML = '';
        return ajax(this.slackApi(searchText));
      }),
      tap(() => this.results.push('')),
      mergeMap((response) => response.response.items),
    ).subscribe(
      (question: any) => {
        setTimeout(() => {
          this.questions.push('');
        });

        this.questionContainer.nativeElement.innerHTML += '<br/>' + question.title;
      },
      err => alert(err.message)
    );
  }

}
