import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inquiryApi } from '../../api/inquiryApi';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function InquiryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ URL 상품 id
  const productId = Number(id);
  const isValidProductId = Number.isInteger(productId) && productId > 0;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [people, setPeople] = useState(1);
  const [requestNote, setRequestNote] = useState('');
  const [agree, setAgree] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const error = useMemo(() => {
    if (!isValidProductId) return '상품 정보가 올바르지 않습니다.';
    if (!name.trim()) return '성함을 입력해 주세요.';
    if (!phone.trim()) return '연락처를 입력해 주세요.';
    if (!email.trim() || !isValidEmail(email)) return '올바른 이메일 주소를 입력해 주세요.';
    if (!departureDate) return '여행 희망 날짜를 선택해 주세요.';
    if (!agree) return '개인정보 수집 및 이용에 동의해 주세요.';
    return null;
  }, [isValidProductId, name, phone, email, departureDate, agree]);

  const canSubmit = !error && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      const payload = {
        productId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        departureDate,
        people,
        requestNote: requestNote.trim(),
      };

      const res = await inquiryApi.createInquiry(payload);

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // 문의 완료 페이지 이동
      navigate('/inquiry/complete', {
        state: {
          productId,
          ...res.data, // inquiryId, inquiryDate, message
        },
        replace: true,
      });
    } catch (err) {
      alert('문의 접수에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center pt-12 pb-[54px] bg-background">
      <div className="w-[768px] flex flex-col gap-5">
        <p className="text-[#64748B] text-[18px]">
          상세한 문의 내용을 입력해 주시면 빠른 시일 내에 답변해 드리겠습니다.
        </p>

        <div className="pb-4 border border-[#E2E8F0] shadow-sm rounded-[12px] bg-white">
          <form className="w-full h-full p-10 flex flex-col gap-10" onSubmit={handleSubmit}>
            {/* 여행자 정보 */}
            <section className="flex flex-col gap-6">
              <h3 className="text-textPrimary font-bold text-[20px] flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
                <img src="/traveler-info-icon.svg" />
                여행자 정보
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="h-12 px-4 rounded-[10px] border bg-[#F8FAFC]"
                />

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="h-12 px-4 rounded-[10px] border bg-[#F8FAFC]"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@naver.com"
                  className="h-12 px-4 rounded-[10px] border bg-[#F8FAFC] col-span-2"
                />
              </div>
            </section>

            {/* 문의 상세 */}
            <section className="flex flex-col gap-6">
              <h3 className="text-textPrimary font-bold text-[20px] flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
                <img src="/inquiry-detail-icon.svg" />
                문의 상세 내용
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="h-12 px-4 rounded-[10px] border bg-[#F8FAFC]"
                />

                <select
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="h-12 px-4 rounded-[10px] border bg-[#F8FAFC]"
                >
                  <option value={1}>성인 1명</option>
                  <option value={2}>성인 2명</option>
                  <option value={3}>성인 3명</option>
                  <option value={4}>성인 4명</option>
                  <option value={5}>성인 5명 이상</option>
                </select>

                <textarea
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="궁금하신 사항이나 특별한 요청 사항이 있다면 자유롭게 입력해 주세요."
                  className="min-h-[140px] p-4 rounded-[10px] border bg-[#F8FAFC] col-span-2 resize-none"
                />
              </div>

              {/* 동의 */}
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <p className="text-[14px]">개인정보 수집 및 이용 동의 (필수)</p>
              </div>

              {error && <p className="text-red-500 text-[13px]">{error}</p>}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full h-[56px] rounded-[14px] bg-primary text-white font-semibold disabled:opacity-50"
              >
                {isSubmitting ? '문의 접수 중...' : '문의하기 완료'}
              </button>

              <p className="text-center text-[12px] text-[#94A3B8]">
                영업일 기준 24시간 이내에 담당자가 연락을 드릴 예정입니다.
              </p>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}
