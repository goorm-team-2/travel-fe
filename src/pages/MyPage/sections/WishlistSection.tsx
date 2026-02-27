import { useMemo, useState } from 'react';

type WishItem = {
  id: string;
  imageSrc: string;
  badge: string;
  location: string;
  title: string;
  rating: number;
  reviewCount: number;
  priceText: string;
};

function HeartButton() {
  return (
    <button
      type="button"
      aria-label="wishlist remove"
      className="absolute right-[12px] top-[12px] grid h-[40px] w-[40px] place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
    >
      <img src="/heart-filled.svg" alt="" className="h-[18px] w-[18px]" />
    </button>
  );
}

function WishlistCard({ item }: { item: WishItem }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#E5EAF1] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="relative">
        <div className="h-[170px] w-full bg-[#EEF2F7]">
          <img src={item.imageSrc} alt={item.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute left-[12px] top-[120px] rounded-[8px] bg-black/60 px-[10px] py-[6px] text-[12px] font-semibold text-white">
          {item.badge}
        </div>

        <HeartButton />
      </div>

      <div className="p-[16px]">
        <p className="text-[14px] font-semibold text-[#2F6EFF]">{item.location}</p>
        <p className="mt-[6px] line-clamp-2 text-[16px] font-semibold text-[#0F172A]">
          {item.title}
        </p>

        <div className="mt-[10px] flex items-center gap-[6px] text-[14px]">
          <span className="text-[#F59E0B]">★</span>
          <span className="font-semibold text-[#0F172A]">{item.rating.toFixed(1)}</span>
          <span className="text-[#94A3B8]">({item.reviewCount.toLocaleString()})</span>
        </div>

        <p className="mt-[12px] text-[20px] font-semibold text-[#0F172A]">{item.priceText}</p>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-[22px] flex items-center justify-center gap-[14px]">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        className="text-[#94A3B8]"
        aria-label="prev"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={[
            'grid h-[36px] w-[36px] place-items-center rounded-full text-[14px] font-semibold',
            p === page ? 'bg-[#2F6EFF] text-white' : 'text-[#64748B]',
          ].join(' ')}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="text-[#94A3B8]"
        aria-label="next"
      >
        ›
      </button>
    </div>
  );
}

export default function WishlistSection() {
  const [page, setPage] = useState(1);

  const dummy: WishItem[] = useMemo(
    () => [
      {
        id: 'w1',
        imageSrc: '/images/wishlist/paris3.png',
        badge: '투어',
        location: '파리, 프랑스',
        title: '에펠탑 야경 투어 (우선 입장 포함)',
        rating: 4.8,
        reviewCount: 1240,
        priceText: '55,000원',
      },
      {
        id: 'w2',
        imageSrc: '/images/wishlist/tokyo1.png',
        badge: '입장권',
        location: '도쿄, 일본',
        title: '시부야 스카이 전망대 입장권',
        rating: 4.9,
        reviewCount: 2100,
        priceText: '22,000원',
      },
      {
        id: 'w3',
        imageSrc: '/images/wishlist/jeju1.png',
        badge: '액티비티',
        location: '제주, 대한민국',
        title: '우도 잠수함 체험 (현장 할인)',
        rating: 4.7,
        reviewCount: 850,
        priceText: '45,000원',
      },
      {
        id: 'w4',
        imageSrc: '/images/wishlist/danang1.png',
        badge: '일일투어',
        location: '다낭, 베트남',
        title: '다낭 바나힐 일일 투어 (호텔 픽업)',
        rating: 4.6,
        reviewCount: 1500,
        priceText: '68,000원',
      },
      {
        id: 'w5',
        imageSrc: '/images/wishlist/bangkok1.png',
        badge: '크루즈',
        location: '방콕, 태국',
        title: '방콕 짜오프라야 프린세스 디너 크루즈',
        rating: 4.8,
        reviewCount: 980,
        priceText: '35,000원',
      },
      {
        id: 'w6',
        imageSrc: '/images/wishlist/sapporo1.png',
        badge: '버스투어',
        location: '삿포로, 일본',
        title: '삿포로 비에이 후라노 버스 투어',
        rating: 4.9,
        reviewCount: 720,
        priceText: '89,000원',
      },
    ],
    [],
  );

  const totalPages = 3;

  return (
    <>
      <h3 className="text-[24px] font-semibold text-[#0F172A]">위시리스트</h3>

      <div className="mt-[18px] grid grid-cols-3 gap-[24px]">
        {dummy.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
