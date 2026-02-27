import { useState } from 'react';
import ReservationsSection from './sections/ReservationsSection';
import WishlistSection from './sections/WishlistSection';
type MenuKey = 'reservations' | 'wishlist';

const ICONS = {
  reservations: {
    default: '/reservation.svg',
    active: '/reservation-active.svg',
  },
  wishlist: {
    default: '/wishlist.svg',
    active: '/wishlist-active.svg',
  },
  settings: '/settings.svg',
  support: '/support.svg',
} as const;

export default function MyPage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('reservations');

  const isActiveMenu = (key: MenuKey) => activeMenu === key;

  return (
    <div className="w-full bg-[#F7F9FC] py-[40px]">
      <div className="mx-auto w-full max-w-[1280px] px-[32px]">
        <div className="mb-[40px] rounded-[16px] border border-[#E5EAF1] bg-white px-[32px] py-[28px] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[20px]">
              <div className="relative h-[80px] w-[80px]">
                <img
                  src="/images/user-profile.jpg"
                  alt="user profile"
                  className="h-full w-full rounded-full object-cover"
                />
                <button
                  type="button"
                  aria-label="프로필 편집"
                  className="absolute bottom-[-6px] right-[-6px] grid h-[25px] w-[25px] place-items-center rounded-full border border-[#E5EAF1] bg-white
                             shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)]"
                >
                  <img src="/pen.svg" alt="" className="h-[10.5px] w-[10.5px]" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-[12px]">
                  <h2 className="text-[20px] font-semibold text-[#0F172A]">안녕하세요, 김여행님</h2>
                  <span className="rounded-[6px] bg-[#EAF2FF] px-[8px] py-[2px] text-[12px] font-semibold text-[#2F6EFF]">
                    GOLD
                  </span>
                </div>
                <p className="mt-[6px] text-[14px] text-neutral-500">가입일: 2023.10.01</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-[28px] h-[44px] w-[1px] bg-[#E5EAF1]" />
              <div className="flex items-center gap-[44px]">
                <div className="text-center">
                  <p className="text-[13px] text-neutral-500">예약 중</p>
                  <p className="mt-[4px] text-[22px] font-semibold text-[#2F6EFF]">3</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] text-neutral-500">위시리스트</p>
                  <p className="mt-[4px] text-[22px] font-semibold text-[#0F172A]">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[32px]">
          <nav className="w-[220px]">
            <ul className="space-y-[10px]">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveMenu('reservations')}
                  className={[
                    'flex w-full items-center gap-[12px] rounded-[10px] px-[14px] py-[12px] text-left text-[14px] font-semibold transition',
                    isActiveMenu('reservations')
                      ? 'bg-[#2F6EFF] text-white'
                      : 'text-[#4B5563] hover:bg-[#EEF3FF]',
                  ].join(' ')}
                >
                  <img
                    src={
                      isActiveMenu('reservations')
                        ? ICONS.reservations.active
                        : ICONS.reservations.default
                    }
                    alt=""
                    className="h-[20px] w-[20px]"
                  />
                  나의 예약 내역
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setActiveMenu('wishlist')}
                  className={[
                    'flex w-full items-center gap-[12px] rounded-[10px] px-[14px] py-[12px] text-left text-[14px] font-semibold transition',
                    isActiveMenu('wishlist')
                      ? 'bg-[#2F6EFF] text-white'
                      : 'text-[#4B5563] hover:bg-[#EEF3FF]',
                  ].join(' ')}
                >
                  <img
                    src={isActiveMenu('wishlist') ? ICONS.wishlist.active : ICONS.wishlist.default}
                    alt=""
                    className="h-[20px] w-[20px]"
                  />
                  위시리스트
                </button>
              </li>

              <li>
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center gap-[12px] rounded-[10px] px-[14px] py-[12px] text-left text-[14px] font-semibold text-[#4B5563] cursor-default"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={ICONS.settings} alt="" className="h-[20px] w-[20px]" />
                  계정 설정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center gap-[12px] rounded-[10px] px-[14px] py-[12px] text-left text-[14px] font-semibold text-[#4B5563] cursor-default"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={ICONS.support} alt="" className="h-[20px] w-[20px]" />
                  고객센터
                </button>
              </li>
            </ul>
          </nav>

          <main className="flex-1">
            {activeMenu === 'reservations' ? <ReservationsSection /> : <WishlistSection />}
          </main>
        </div>
      </div>
    </div>
  );
}
