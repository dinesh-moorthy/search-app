import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private cartCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private get products(): Product[] {
    return this.cartItems$.getValue();
  }

  cartItems: Observable<Product[]> = this.cartItems$.asObservable();
  cartCount: Observable<number> = this.cartCount$.asObservable();

  constructor() {}

  addProductsToCart(product: Product): void {
    const currentItems = this.products;
    const productIndex = currentItems.findIndex((data) => {
      return data.id === product.id;
    });
    if (productIndex !== -1) {
      currentItems[productIndex].quantity =
        1 + (currentItems[productIndex]?.quantity || 0);
    } else {
      currentItems.push({
        ...product,
        quantity: 1,
      });
    }
    this.cartItems$.next(currentItems);
    this.updateCartCount();
  }

  updateCartCount(): void {
    let count = 0;
    this.products.forEach((product) => {
      if (product.quantity) {
        count = count + product.quantity;
      }
    });
    this.cartCount$.next(count);
  }
}
