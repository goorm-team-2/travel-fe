// src/api/productApi.d.ts
import type { AxiosResponse } from 'axios';
import type { FeaturedProduct } from '../types/product';

export const productApi: {
  getFeaturedProducts: () => Promise<AxiosResponse<FeaturedProduct[]>>;
  getProducts: () => Promise<AxiosResponse<unknown>>;
  getProductDetail: (id: number | string) => Promise<AxiosResponse<unknown>>;
};
