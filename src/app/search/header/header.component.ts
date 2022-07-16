import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchValue = '';
  cartCount$!: Observable<number>;

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.searchValue = this.searchService.getSearchValue();
    this.cartCount$ = this.cartService.cartCount;
  }

  ngAfterViewInit(): void {
    const ele = this.searchInput.nativeElement;
    fromEvent<any>(ele, 'input')
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.searchService.updateSearchValue(ele.value);
      });
  }

  onSearchClear(): void {
    this.searchValue = '';
    this.searchService.updateSearchValue('');
  }

  openOverlay(template: TemplateRef<HTMLElement>): void {
    this.overlayService.openOverlay(template);
  }
}
