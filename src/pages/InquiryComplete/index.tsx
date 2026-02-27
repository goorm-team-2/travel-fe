import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Complete from './Complete';

type InquiryCompleteState = {
  productId: number;
  inquiryId: string;
  inquiryDate: string;
  message: string;
};

export default function InquiryComplete() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const s = state as InquiryCompleteState | null;

  // state 없이 직접 URL로 들어온 경우 방어
  useEffect(() => {
    if (!s?.inquiryId || !s?.inquiryDate) {
      navigate('/', { replace: true });
    }
  }, [s, navigate]);

  if (!s?.inquiryId || !s?.inquiryDate) return null;

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center">
      <Complete inquiryId={s.inquiryId} inquiryDate={s.inquiryDate} />
    </div>
  );
}
