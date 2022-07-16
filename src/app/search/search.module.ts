import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, SearchRoutingModule],
})
export class SearchModule {}
