import { Paging } from './paging.model';
import { Product } from './product.model';

export interface SearchResponse {
  code: number;
  data: ProductList;
  status: string;
}

interface ProductList {
  products: Product[];
  paging: Paging;
}
