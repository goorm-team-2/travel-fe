export type FeaturedProduct = {
  id: number | string;
  title: string;
  priceText: string;
  imageUrl: string;
};

export type Product = {
  id: number | string;

  title: string;
  durationText: string;

  locationText: string;
  imageUrl: string;

  rating: number;
  reviewCount: number;

  priceText: string;
  originalPriceText?: string;

  badgeLeft?: string;
  badgeRight?: string;
};
