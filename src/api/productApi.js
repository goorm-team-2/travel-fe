// api/productApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// 상품 관련 API
export const productApi = {
  // 홈 인기 상품 조회
  getFeaturedProducts: () => {
    return axios.get(`${BASE_URL}/products/featured`);
  },

  // 상품 목록 조회
  getProducts: () => {
    return axios.get(`${BASE_URL}/products`);
  },

  // 상품 상세 조회
  getProductDetail: (id) => {
    return axios.get(`${BASE_URL}/products/${id}`);
  }
};