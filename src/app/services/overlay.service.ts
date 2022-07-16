import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayPosition } from '../model/overlay.model';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private showOverlay$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private overlayTemplate$: BehaviorSubject<TemplateRef<HTMLElement> | null> =
    new BehaviorSubject<TemplateRef<HTMLElement> | null>(null);
  private overlayContentPosition$: BehaviorSubject<OverlayPosition> =
    new BehaviorSubject<OverlayPosition>('right');

  showOverlay: Observable<boolean> = this.showOverlay$.asObservable();
  overlayTemplate: Observable<TemplateRef<HTMLElement> | null> =
    this.overlayTemplate$.asObservable();
  overlayPosition: Observable<OverlayPosition> =
    this.overlayContentPosition$.asObservable();

  constructor() {}

  openOverlay(
    template: TemplateRef<HTMLElement>,
    position: OverlayPosition = 'right'
  ): void {
    this.showOverlay$.next(true);
    this.overlayTemplate$.next(template);
    this.overlayContentPosition$.next(position);
  }

  closeOverlay(): void {
    this.showOverlay$.next(false);
  }
}
