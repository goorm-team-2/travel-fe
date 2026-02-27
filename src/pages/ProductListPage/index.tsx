import { useEffect, useMemo, useState } from 'react';
import { productApi } from '../../api/productApi';
import ProductCard from '../../components/ProductCard';
import type { Product } from '../../types/product';
import FilterSidebar from '../../components/FilterSidebar';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: '그랜드 하얏트 제주 3박 4일 패키지',
    durationText: '3박4일',
    locationText: '제주도, 대한민국',
    imageUrl: '/images/trending/trending4.png',
    rating: 4.9,
    reviewCount: 428,
    originalPriceText: '₩450,000',
    priceText: '₩289,000~',
    badgeLeft: 'BEST',
    badgeRight: '특가',
  },
  {
    id: 2,
    title: '도쿄 도심 속 힐링 미식 투어 4일',
    durationText: '4일',
    locationText: '도쿄, 일본',
    imageUrl: '/images/trending/trending5.png',
    rating: 4.7,
    reviewCount: 215,
    priceText: '₩650,000~',
  },
  {
    id: 3,
    title: '발리 우붓 풀빌라 허니문 6일',
    durationText: '6일',
    locationText: '발리, 인도네시아',
    imageUrl: '/images/trending/trending6.png',
    rating: 4.8,
    reviewCount: 156,
    priceText: '₩1,240,000~',
  },
  {
    id: 4,
    title: '파리 & 런던 서유럽 핵심 일주 9일',
    durationText: '9일',
    locationText: '파리, 프랑스',
    imageUrl: '/images/featured/paris1.png',
    rating: 4.6,
    reviewCount: 89,
    priceText: '₩3,890,000~',
  },
  {
    id: 5,
    title: '산토리니 럭셔리 요트 투어 8일',
    durationText: '8일',
    locationText: '산토리니, 그리스',
    imageUrl: '/images/featured/santorini.png',
    rating: 4.9,
    reviewCount: 112,
    priceText: '₩4,500,000~',
  },
  {
    id: 6,
    title: '다낭 바나힐 & 호이안 가족 패키지 5일',
    durationText: '5일',
    locationText: '다낭, 베트남',
    imageUrl: '/images/featured/danang.png',
    rating: 4.5,
    reviewCount: 567,
    priceText: '₩450,000~',
  },
];

// 백엔드 응답이 필드명이 다르면 여기서 매핑만 바꾸기
function adaptProduct(raw: any): Product {
  return {
    id: raw.id,
    title: raw.title ?? raw.productName ?? '',
    durationText: raw.durationText ?? raw.nightsDays ?? raw.duration ?? '',
    locationText: raw.locationText ?? raw.location ?? '',
    imageUrl: raw.imageUrl ?? raw.thumbnailUrl ?? '',
    rating: Number(raw.rating ?? 0),
    reviewCount: Number(raw.reviewCount ?? raw.reviews ?? 0),
    priceText: raw.priceText ?? raw.price ?? '',
    originalPriceText: raw.originalPriceText ?? raw.originalPrice,
    badgeLeft: raw.badgeLeft,
    badgeRight: raw.badgeRight,
  };
}

export default function ProductListPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        const res = await productApi.getProducts(); //  GET /api/products
        const data = res?.data;

        if (!alive) return;

        if (Array.isArray(data)) {
          setItems(data.map(adaptProduct));
        } else {
          setItems([]);
        }
      } catch (e) {
        console.error('[getProducts] failed:', e);
        if (!alive) return;

        setItems(FALLBACK_PRODUCTS);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const totalCountText = useMemo(() => {
    // 지금은 더미로 items.length, 백엔드에서 totalCount 주면 교체
    return items.length.toLocaleString();
  }, [items.length]);

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="mx-auto flex w-full max-w-[1280px] gap-[24px] px-[32px] py-[32px]">
        <FilterSidebar />

        <main className="flex-1">
          <p
            className="text-[16px] font-[400] leading-[24px] text-[#64748B]"
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            당신을 위한 최적의 여행 상품을 확인해보세요.
          </p>

          <div className="mt-[12px] flex h-[70px] items-center justify-between rounded-[12px] border border-[#E2E8F0] bg-white px-[16px]">
            <p
              className="text-[14px] font-[500] leading-[20px] text-[#0F172A]"
              style={{ fontFamily: 'Noto Sans KR' }}
            >
              검색 결과{' '}
              <span
                className="font-[500] text-[#0066FF]"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {totalCountText}
              </span>
              개
            </p>

            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center gap-[8px] text-[14px] font-[600] leading-[20px] text-[#0F172A]"
                style={{ fontFamily: 'Noto Sans KR' }}
                onClick={() => {
                  // TODO: 정렬 드롭다운 연결
                }}
              >
                추천순
                <img src="/sort-chevron.svg" alt="sort" className="h-[14px] w-[14px]" />
              </button>

              <div className="ml-[16px] flex h-[26px] items-center border-l border-[#E2E8F0] pl-[16px]" />
              <div className="flex items-center gap-[12px]">
                <button
                  type="button"
                  className="inline-flex h-[26px] w-[26px] items-center justify-center p-[4px]"
                  aria-label="grid"
                >
                  <img src="/view-grid.svg" alt="grid" className="h-[18px] w-[18px]" />
                </button>

                <button
                  type="button"
                  className="inline-flex h-[26px] w-[26px] items-center justify-center p-[4px]"
                  aria-label="list"
                >
                  <img src="/view-list.svg" alt="list" className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[16px] grid grid-cols-3 gap-[24px]">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[420px] rounded-[12px] bg-slate-200 animate-pulse" />
                ))
              : items.map((item) => <ProductCard key={item.id} item={item} />)}
          </div>

          <div className="mt-[24px] flex justify-center">
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white"
                aria-label="prev"
              >
                <span className="text-[18px] leading-none text-[#94A3B8]">‹</span>
              </button>

              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#0066FF] text-[14px] font-[500] leading-[20px] text-white"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                1
              </button>

              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white text-[14px] font-[500] leading-[20px] text-[#0F172A]"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                2
              </button>

              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white text-[14px] font-[500] leading-[20px] text-[#0F172A]"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                3
              </button>

              <span
                className="inline-flex h-[40px] items-center px-[4px] text-[14px] font-[500] leading-[20px] text-[#94A3B8]"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                …
              </span>

              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white text-[14px] font-[500] leading-[20px] text-[#0F172A]"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                12
              </button>

              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white"
                aria-label="next"
              >
                <span className="text-[18px] leading-none text-[#94A3B8]">›</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
