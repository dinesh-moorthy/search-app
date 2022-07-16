export interface Product {
  id: string;
  sku: string;
  images: string[];
  name: string;
  price: Price;
  status: string;
  review: Review;
  location: string;
  quantity?: number;
}

interface Price {
  priceDisplay: string;
  strikeThroughPriceDisplay?: string;
  discount?: number;
}

interface Review {
  rating: number;
  count: number;
  absoluteRating: number;
}
