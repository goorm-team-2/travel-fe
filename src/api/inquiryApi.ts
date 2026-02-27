// api/inquiryApi.ts
import axios from 'axios';

const BASE_URL = '/api';

/** 문의 생성 요청 */
export type CreateInquiryRequest = {
  productId: number;
  name: string;
  phone: string;
  email: string;
  departureDate: string;
  people: number;
  requestNote: string;
};

/** 문의 생성 응답 */
export type CreateInquiryResponse = {
  inquiryId: string;
  inquiryDate: string;
  message: string;
};

// 문의 관련 API
export const inquiryApi = {
  // 예약 문의 등록
  createInquiry: (inquiryData: CreateInquiryRequest) => {
    return axios.post<CreateInquiryResponse>(`${BASE_URL}/inquiries`, inquiryData, {
      withCredentials: true, // 로그인 세션 필요할 가능성 높음
    });
  },

  // 내 예약 조회
  getMyInquiries: () => {
    return axios.get(`${BASE_URL}/inquiries/my`, {
      withCredentials: true,
    });
  },
};
