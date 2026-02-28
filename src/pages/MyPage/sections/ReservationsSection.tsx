import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inquiryApi } from '../../../api/inquiryApi';
import { resolveBackendImageUrl } from '../../../utils/asset';

type FilterKey = 'all' | 'ongoing' | 'done';
type ReservationStatus = 'INQUIRY' | 'WAITING' | 'DONE';

type ReservationItem = {
  id: string;
  productId: number | string;
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

type MyInquiryRaw = {
  id: number;
  name: string;
  thumbnailUrl: string;
  region: string;
  departureDate: string;
  duration: string;
  price: number;
};

function formatDateDot(iso: string) {
  return iso ? iso.replaceAll('-', '.') : '';
}

function buildPeopleText(adult: number, child: number) {
  const parts: string[] = [`성인 ${adult}명`];
  if (child > 0) parts.push(`아동 ${child}명`);
  return parts.join(', ');
}

function formatPriceKRW(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

function parseNights(durationText: string) {
  const m = durationText?.match(/(\d+)\s*박/);
  if (!m) return 0;
  return Number(m[1] ?? 0) || 0;
}

function addDays(iso: string, days: number) {
  if (!iso) return iso;
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeReservationImage(url: string) {
  if (!url) return url;
  if (url.startsWith('/images/mypage/')) return url;
  if (url.startsWith('/images/')) return resolveBackendImageUrl(url);

  return url;
}

function adaptMyInquiry(raw: MyInquiryRaw, idx: number): ReservationItem {
  const nights = parseNights(raw.duration);
  const endDate = addDays(raw.departureDate, nights);
  const statusByIndex: ReservationStatus[] = ['INQUIRY', 'WAITING', 'DONE'];
  const status = statusByIndex[idx % statusByIndex.length];

  return {
    id: `r${raw.id}`,
    productId: raw.id,
    code: `B${String(raw.id).padStart(4, '0')}-${String(1000 + raw.id).slice(-4)}`,
    productName: raw.name ?? '',
    location: raw.region ?? '',
    startDate: raw.departureDate ?? '',
    endDate,
    adultCount: 2,
    childCount: 0,
    priceText: formatPriceKRW(Number(raw.price ?? 0)),
    imageSrc: normalizeReservationImage(raw.thumbnailUrl ?? ''),
    status,
  };
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

function ReservationCard({
  item,
  onClickDetail,
  onClickInquiry,
  onClickReview,
}: {
  item: ReservationItem;
  onClickDetail: (productId: number | string) => void;
  onClickInquiry: (productId: number | string) => void;
  onClickReview: (productId: number | string) => void;
}) {
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
        <button
          type="button"
          onClick={() => onClickDetail(item.productId)}
          className="h-[150px] w-[220px] shrink-0 overflow-hidden rounded-[12px] bg-[#EEF2F7]"
          aria-label="go-detail"
        >
          <img
            src={item.imageSrc}
            alt={item.productName}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
        </button>

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
                  onClick={() => onClickReview(item.productId)}
                  className="rounded-[10px] bg-[#2F6EFF] px-[18px] py-[10px] text-[14px] font-semibold text-white"
                >
                  리뷰 작성
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onClickDetail(item.productId)}
                    className="rounded-[10px] border border-[#E2E8F0] bg-white px-[18px] py-[10px] text-[14px] font-semibold text-[#0F172A]"
                  >
                    상세 보기
                  </button>

                  {item.status === 'INQUIRY' ? (
                    <button
                      type="button"
                      onClick={() => onClickInquiry(item.productId)}
                      className="rounded-[10px] bg-[#2F6EFF] px-[18px] py-[10px] text-[14px] font-semibold text-white"
                    >
                      문의 상담
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        alert('예약 취소 기능은 추후 연결 예정입니다.');
                      }}
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
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [items, setItems] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        productId: 1,
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
        productId: 2,
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
        productId: 3,
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

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await inquiryApi.getMyInquiries();
        const data = res?.data;

        if (!alive) return;

        if (Array.isArray(data)) {
          setItems((data as MyInquiryRaw[]).map((raw, idx) => adaptMyInquiry(raw, idx)));
        } else {
          setItems([]);
        }
      } catch (e) {
        console.error('[getMyInquiries] failed:', e);
        if (!alive) return;
        setItems(reservationDummy);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [reservationDummy]);

  const filteredReservations = useMemo(() => {
    const base = loading ? reservationDummy : items;

    if (activeFilter === 'all') return base;
    if (activeFilter === 'done') return base.filter((x) => x.status === 'DONE');
    return base.filter((x) => x.status !== 'DONE');
  }, [activeFilter, items, loading, reservationDummy]);

  const goDetail = (productId: number | string) => {
    navigate(`/products/${productId}`);
  };

  const goInquiry = (productId: number | string) => {
    navigate(`/inquiry/${productId}`);
  };

  const goReview = (productId: number | string) => {
    navigate(`/products/${productId}`);
  };

  const showEmpty = !loading && filteredReservations.length === 0;

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
        {showEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-[16px] border border-[#E5EAF1] bg-white py-[64px]">
            <div className="mb-[24px]">
              <img
                src="/images/empty-reservation.png"
                alt="예약 내역 없음"
                className="h-[120px] w-auto opacity-80"
              />
            </div>

            <p className="text-[16px] font-semibold text-[#0F172A]">
              아직 예약 및 문의 내역이 없습니다.
            </p>
            <p className="mt-[8px] text-[14px] text-[#64748B]">
              마음에 드는 여행 상품을 찾아보세요.
            </p>

            <button
              type="button"
              onClick={() => navigate('/products')}
              className="mt-[24px] rounded-[10px] bg-[#2F6EFF] px-[24px] py-[12px] text-[14px] font-semibold text-white"
            >
              여행 상품 보러 가기
            </button>
          </div>
        ) : (
          filteredReservations.map((item) => (
            <ReservationCard
              key={item.id}
              item={item}
              onClickDetail={goDetail}
              onClickInquiry={goInquiry}
              onClickReview={goReview}
            />
          ))
        )}
      </div>
    </>
  );
}
