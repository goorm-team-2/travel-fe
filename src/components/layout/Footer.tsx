import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-[160px] py-[48px]">
        <div className="mx-auto flex max-w-[960px] items-start justify-between gap-[32px]">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="TravelEase" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#94A3B8]">TravelEase</span>
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#64748B]">
              <p>(주) 트래블 이즈 | 대표자: 홍길동 | 사업자등록번호: 123-45-67890</p>
              <p>서울특별시 강남구 테헤란로 123 여행타워 15층</p>
              <p>이메일: support@travelservice.com | 전화: 1588-0000</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-6 text-sm">
              <Link to="#" className="text-[#64748B] hover:text-[#0066FF]">
                이용약관
              </Link>
              <Link to="#" className="font-semibold text-[#0F172A] hover:text-[#0066FF]">
                개인정보처리방침
              </Link>
              <Link to="#" className="text-[#64748B] hover:text-[#0066FF]">
                고객센터
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#E2E8F0]/60 hover:bg-[#E2E8F0]"
                aria-label="Share"
              >
                <img src="/share.svg" alt="" className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#E2E8F0]/60 hover:bg-[#E2E8F0]"
                aria-label="Message"
              >
                <img src="/message.svg" alt="" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[32px] max-w-[960px] border-t border-[#E2E8F0] pt-[32px]">
          <p className="text-center text-sm text-[#94A3B8]">
            Copyright © 2026 Travel Ease Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
