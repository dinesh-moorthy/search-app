import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResponse } from '../model/search-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'iphone'
  );

  searchValue: Observable<string> = this.searchValue$.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(
    searchTerm: string,
    page: number = 0,
    start: number = 0
  ): Observable<SearchResponse> {
    return this.http.get<SearchResponse>('/backend/search/products', {
      params: {
        searchTerm,
        page,
        start,
        itemPerPage: 30,
      },
    });
  }

  getSearchValue(): string {
    return this.searchValue$.getValue();
  }

  updateSearchValue(value: string): void {
    this.searchValue$.next(value);
  }
}
