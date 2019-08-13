import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { map, filter, switchMap, mergeMap, debounceTime, distinctUntilChanged, catchError, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { DomSanitizer } from '@angular/platform-browser';

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

  keyUps: any[] = [];
  filters: any[] = [];
  debounces: any[] = [];
  distincts: any[] = [];
  results: any[] = [];
  questions: any[] = [];

  // tslint:disable-next-line: max-line-length
  private slackApi = (searchText) => `https://api.stackexchange.com/2.2/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&intitle=${searchText}&filter=default`;

  constructor(private sanatizer: DomSanitizer) { }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      tap((value) => this.keyUps.push(this.getCircle())),
      filter((searchText) => !!searchText && searchText.length > 3),
      tap((value) => this.filters.push(this.getCircle())),
      debounceTime(333),
      tap((value) => this.debounces.push(this.getCircle())),
      distinctUntilChanged(),
      tap((value) => this.distincts.push(this.getCircle())),
      switchMap((searchText) => {
        this.questionContainer.nativeElement.innerHTML = '';
        return ajax(this.slackApi(searchText));
      }),
      tap((results) => this.results.push(this.getCircle())),
      catchError(err => {
        console.error('Error', err);
        return of({ response: { items: []}});
      }),
      mergeMap((response) => response.response.items)
    ).subscribe((question: any) => {
        this.questionContainer.nativeElement.innerHTML += '<br/>' + question.title;
        this.questions.push(this.getCircle());
      },
      err => alert(err.message),
      () => console.log('done')
    );
  }

  getCircle() {
    return this.sanatizer.bypassSecurityTrustHtml(`<div class="circle" style="background-color: ${this.getRandomColor()}"></div>`);
  }

  getRandomColor() {
    return `#${Math.random().toString(16).substr(-6)}`;
  }
}
