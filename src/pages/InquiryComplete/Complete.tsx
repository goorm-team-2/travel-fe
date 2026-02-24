import { useNavigate } from 'react-router-dom';

export default function Complete() {
  const navigate = useNavigate();

  return (
    <div className="p-12 w-[640px] bg-white flex flex-col items-center justify-center border border-border rounded-[12px]">
      <img className="w-[80px] h-[112px]" src="/success-icon.svg" />
      <h2 className="text-textPrimary font-bold text-[30px] mb-4">
        문의가 정상적으로 접수되었습니다.
      </h2>
      <p className="text-center font-normal text-[16px] text-[#475569] mb-10">
        고객님의 소중한 문의가 접수되었습니다.
        <br />
        담당자가 내용을 꼼꼼히 확인 후 신속하게 답변해 드리겠습니다.
      </p>
      <div className="w-full bg-[#F8FAFC] flex flex-col mb-10 rounded-[12px] p-6 gap-4">
        <h3 className="flex gap-2 items-center font-bold text-textPrimary text-[16px]">
          <img className="w-[12px] h-[15px]" src="/docs-icon.svg" />
          접수 상세 내역
        </h3>
        <div className="flex pt-1 pb-3 border-b border-[#E2E8F0]/50">
          <p className="text-[#64748B] font-medium text-[14px] flex-1">접수 번호</p>
          <p className="text-textPrimary font-bold text-[14px]">TRV-20260132</p>
        </div>
        <div className="flex pt-1 pb-3 border-b border-[#E2E8F0]/50">
          <p className="text-[#64748B] font-medium text-[14px] flex-1">문의 일시</p>
          <p className="text-textPrimary font-bold text-[14px]">2026년 1월 27일 14:30</p>
        </div>
      </div>
      <div className="w-full flex gap-4 font-bold text-[16px]">
        <button
          onClick={() => navigate('/')}
          className="bg-primary rounded-[8px] py-[15px] text-white flex-1 transition-all duration-200 hover:bg-[#0052CC] active:bg-primary"
        >
          홈으로 이동
        </button>
        <button
          onClick={() => navigate('/mypage')}
          className="border border-[#E2E8F0] rounded-[8px] py-[15px] flex-1 transition-all duration-200 hover:bg-secondary active:bg-white"
        >
          내 문의 내역 확인
        </button>
      </div>
    </div>
  );
}
