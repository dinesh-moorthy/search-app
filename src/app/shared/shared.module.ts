import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './components/overlay/overlay.component';
import { ErrorComponent } from './components/error/error.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [OverlayComponent, ErrorComponent, InfiniteScrollDirective],
  imports: [CommonModule],
  exports: [OverlayComponent, ErrorComponent, InfiniteScrollDirective],
})
export class SharedModule {}
