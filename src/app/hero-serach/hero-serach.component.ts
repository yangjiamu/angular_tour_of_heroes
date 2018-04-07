import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Hero} from '../hero';
import {Subject} from 'rxjs/Subject';
import {HeroService} from '../hero.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-serach',
  templateUrl: './hero-serach.component.html',
  styleUrls: ['./hero-serach.component.css']
})
export class HeroSerachComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term): void {
    this.searchTerms.next(term);
  }
}
