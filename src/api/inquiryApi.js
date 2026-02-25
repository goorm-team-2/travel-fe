// api/inquiryApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// 문의 관련 API
export const inquiryApi = {
  // 예약 문의 등록
  createInquiry: (inquiryData) => {
    return axios.post(`${BASE_URL}/inquiries`, inquiryData);
  },

  // 내 예약 조회
  getMyInquiries: () => {
    return axios.get(`${BASE_URL}/inquiries/my`);
  }
};