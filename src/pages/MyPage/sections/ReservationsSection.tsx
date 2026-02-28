import { useMemo, useState } from 'react';

type FilterKey = 'all' | 'ongoing' | 'done';
type ReservationStatus = 'INQUIRY' | 'WAITING' | 'DONE';

type ReservationItem = {
  id: string;
  code: string;
  productName: string;
  location: string;
  startDate: string;
  endDate: string;
  adultCount: number;
  childCount: number;
  priceText: string;
  imageSrc: string;
  status: ReservationStatus;
};

function formatDateDot(iso: string) {
  return iso ? iso.replaceAll('-', '.') : '';
}

function buildPeopleText(adult: number, child: number) {
  const parts: string[] = [`성인 ${adult}명`];
  if (child > 0) parts.push(`아동 ${child}명`);
  return parts.join(', ');
}

function StatusPill({ status }: { status: ReservationStatus }) {
  const spec =
    status === 'INQUIRY'
      ? { label: '문의 접수', className: 'bg-[#EAF2FF] text-[#2F6EFF] border-[#BFD3FF]' }
      : status === 'WAITING'
        ? { label: '예약 대기', className: 'bg-[#F1F5F9] text-[#334155] border-[#E2E8F0]' }
        : { label: '여행 완료', className: 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]' };

  return (
    <span
      className={[
        'inline-flex items-center rounded-[999px] border px-[12px] py-[6px] text-[12px] font-semibold leading-[16px]',
        spec.className,
      ].join(' ')}
    >
      {spec.label}
    </span>
  );
}

function ReservationCard({ item }: { item: ReservationItem }) {
  const isInquiry = item.status === 'INQUIRY';
  const isDone = item.status === 'DONE';

  const codeColor = isInquiry ? 'text-[#2F6EFF]' : 'text-[#94A3B8]';
  const metaColor = isDone ? 'text-[#94A3B8]' : 'text-[#64748B]';
  const priceColor = isDone ? 'text-[#94A3B8]' : 'text-[#0F172A]';

  const dateLine = `여행 일정: ${formatDateDot(item.startDate)} - ${formatDateDot(
    item.endDate,
  )} | 인원: ${buildPeopleText(item.adultCount, item.childCount)}`;

  return (
    <div className="rounded-[16px] border border-[#E5EAF1] bg-white p-[24px] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex gap-[24px]">
        <div className="h-[150px] w-[220px] shrink-0 overflow-hidden rounded-[12px] bg-[#EEF2F7]">
          <img src={item.imageSrc} alt={item.productName} className="h-full w-full object-cover" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-[16px]">
            <div className="min-w-0">
              <p className={`text-[14px] font-semibold ${codeColor}`}>{item.code}</p>
              <h4 className="mt-[6px] truncate text-[18px] font-semibold text-[#0F172A]">
                {item.productName}
              </h4>
              <p className={`mt-[10px] text-[14px] font-medium ${metaColor}`}>{dateLine}</p>
            </div>
            <StatusPill status={item.status} />
          </div>

          <div className="my-[18px] h-[1px] w-full bg-[#EEF2F7]" />

          <div className="flex items-center justify-between">
            <p className={`text-[22px] font-semibold ${priceColor}`}>{item.priceText}</p>

            <div className="flex items-center gap-[12px]">
              {item.status === 'DONE' ? (
                <button
                  type="button"
                  className="rounded-[10px] bg-[#2F6EFF] px-[18px] py-[10px] text-[14px] font-semibold text-white"
                >
                  리뷰 작성
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="rounded-[10px] border border-[#E2E8F0] bg-white px-[18px] py-[10px] text-[14px] font-semibold text-[#0F172A]"
                  >
                    상세 보기
                  </button>

                  {item.status === 'INQUIRY' ? (
                    <button
                      type="button"
                      className="rounded-[10px] bg-[#2F6EFF] px-[18px] py-[10px] text-[14px] font-semibold text-white"
                    >
                      문의 상담
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="rounded-[10px] bg-[#E2E8F0] px-[18px] py-[10px] text-[14px] font-semibold text-[#334155]"
                    >
                      예약 취소
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filterButtons = useMemo(
    () =>
      [
        { key: 'all' as const, label: '전체' },
        { key: 'ongoing' as const, label: '진행 중' },
        { key: 'done' as const, label: '완료' },
      ] as const,
    [],
  );

  const reservationDummy: ReservationItem[] = useMemo(
    () => [
      {
        id: 'r1',
        code: 'B0924-1102',
        productName: '몰디브 럭셔리 워터빌라 5박 7일 올인클루시브 패키지',
        location: '몰디브',
        startDate: '2026-12-15',
        endDate: '2026-12-21',
        adultCount: 2,
        childCount: 0,
        priceText: '4,250,000원',
        imageSrc: '/images/mypage/maldives.png',
        status: 'INQUIRY',
      },
      {
        id: 'r2',
        code: 'B0918-0582',
        productName: '교토 가을 단풍 감성 스테이 & 미식 프라이빗 투어',
        location: '교토',
        startDate: '2026-11-10',
        endDate: '2026-11-14',
        adultCount: 2,
        childCount: 1,
        priceText: '1,890,000원',
        imageSrc: '/images/mypage/kyoto.png',
        status: 'WAITING',
      },
      {
        id: 'r3',
        code: 'B0812-0012',
        productName: '이탈리아 베네치아 낭만 운하 투어 & 로컬 미식체험',
        location: '베네치아',
        startDate: '2025-08-15',
        endDate: '2025-08-20',
        adultCount: 1,
        childCount: 0,
        priceText: '850,000원',
        imageSrc: '/images/mypage/venice.png',
        status: 'DONE',
      },
    ],
    [],
  );

  const filteredReservations = useMemo(() => {
    if (activeFilter === 'all') return reservationDummy;
    if (activeFilter === 'done') return reservationDummy.filter((x) => x.status === 'DONE');
    return reservationDummy.filter((x) => x.status !== 'DONE');
  }, [activeFilter, reservationDummy]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-semibold text-[#0F172A]">나의 예약 및 문의 내역</h3>
        <div className="flex items-center gap-[28px]">
          {filterButtons.map((b) => {
            const active = activeFilter === b.key;

            if (b.key === 'all' && active) {
              return (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setActiveFilter(b.key)}
                  className="rounded-[8px] border border-[#E2E8F0] bg-white px-[12px] py-[6px] text-[12px] font-semibold leading-[16px] text-[#0F172A]"
                >
                  {b.label}
                </button>
              );
            }

            return (
              <button
                key={b.key}
                type="button"
                onClick={() => setActiveFilter(b.key)}
                className={[
                  'text-[12px] font-semibold leading-[16px]',
                  active ? 'text-[#0F172A]' : 'text-[#64748B]',
                ].join(' ')}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[20px] space-y-[20px]">
        {filteredReservations.map((item) => (
          <ReservationCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
