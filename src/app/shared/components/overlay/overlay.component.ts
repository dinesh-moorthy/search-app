import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlayPosition } from 'src/app/model/overlay.model';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  isOpen$!: Observable<boolean>;
  template$!: Observable<TemplateRef<HTMLElement> | null>;
  overlayPosition$!: Observable<OverlayPosition>;

  constructor(private overlayService: OverlayService) {}

  ngOnInit(): void {
    this.isOpen$ = this.overlayService.showOverlay;
    this.template$ = this.overlayService.overlayTemplate;
    this.overlayPosition$ = this.overlayService.overlayPosition;
  }

  closeOverlay(): void {
    this.overlayService.closeOverlay();
  }
}
