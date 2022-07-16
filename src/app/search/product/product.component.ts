import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() view: 'list' | 'grid' | 'cart' = 'grid';

  constructor(
    private cartService: CartService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {}

  addToBag(template: TemplateRef<HTMLElement>): void {
    this.cartService.addProductsToCart(this.product);
    this.overlayService.openOverlay(template, 'center');
  }
}
