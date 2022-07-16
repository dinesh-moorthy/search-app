import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Paging } from 'src/app/model/paging.model';
import { Product } from 'src/app/model/product.model';
import { SearchResponse } from 'src/app/model/search-response.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  products: Product[] = [];
  selectedView: 'list' | 'grid' = 'grid';
  searchValue = '';
  isLoading = false;
  isProductsAvailable = true;
  showScrollToTopButton = false;
  private pageInfo!: Paging;
  private products$!: Subscription;
  private paginationProducts$!: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.products$ = this.searchService.searchValue
      .pipe(
        tap(() => (this.isLoading = true)),
        tap((searchText) => (this.searchValue = searchText)),
        switchMap((searchText) =>
          searchText
            ? this.searchService.getProducts(searchText).pipe(
                catchError(() => {
                  this.isLoading = false;
                  this.products = [];
                  return new Observable<SearchResponse>();
                })
              )
            : of(undefined)
        )
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          if (response) {
            this.handleProductsResponse(response);
          } else {
            this.products = [];
          }
        },
        () => {
          this.isLoading = false;
          this.products = [];
        }
      );
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
    this.paginationProducts$.unsubscribe();
  }

  onScroll() {
    if (this.isProductsAvailable) {
      let page;
      let start;
      this.isLoading = true;
      if (this.pageInfo) {
        page = this.pageInfo.page + 1;
        start = page * this.pageInfo.item_per_page;
      }
      this.paginationProducts$ = this.searchService
        .getProducts(this.searchValue, page, start)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.handleProductsResponse(response, true);
          },
          () => {
            this.isLoading = false;
            this.isProductsAvailable = false;
          }
        );
    }
  }

  handleProductsResponse(
    response: SearchResponse,
    isFromPagination: boolean = false
  ) {
    if (response?.data?.products) {
      this.products = isFromPagination
        ? this.products.concat(response.data.products)
        : response.data.products;
    }
    if (response?.data?.paging) {
      this.pageInfo = response.data.paging;
      this.isProductsAvailable =
        this.pageInfo.total_item >
        this.pageInfo.item_per_page * (this.pageInfo.page + 1)
          ? true
          : false;
    }
    if (!isFromPagination && this.scrollContainer) {
      this.scrollContainer.nativeElement.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  scrollToTop(): void {
    this.scrollContainer?.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
