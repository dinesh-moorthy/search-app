import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime, map, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Input() scrollToTopOffset = 1000;
  @Input() scrollEndOffset = 100;
  @Output() onScrollEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() showScrollToTopButton: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private scroll$ = new Subject<Event>();
  private showScrollToTop$ = new Subject<boolean>();

  private scrollSubscription!: Subscription;
  private scrollToTopSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.scrollToTopSubscription = this.showScrollToTop$
      .pipe(distinctUntilChanged())
      .subscribe((value) => this.showScrollToTopButton.emit(value));

    this.scrollSubscription = this.scroll$
      .pipe(
        map((event) => {
          const target = event.target as HTMLElement;
          if (
            target.offsetHeight + target.scrollTop >=
            target.scrollHeight - this.scrollEndOffset
          ) {
            return event;
          }
          return;
        }),
        throttleTime(1000, undefined, { trailing: true })
      )
      .subscribe((event: Event | undefined) => {
        if (event) {
          this.onScrollEnd.emit();
        }
      });
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
    this.scrollToTopSubscription.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  scrollHandler(event: Event) {
    this.scroll$.next(event);

    if ((event.target as HTMLElement).scrollTop > this.scrollToTopOffset) {
      this.showScrollToTop$.next(true);
    } else {
      this.showScrollToTop$.next(false);
    }
  }
}
