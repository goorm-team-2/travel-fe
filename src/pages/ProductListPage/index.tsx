import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import ProductCard from '../../components/ProductCard';
import type { Product } from '../../types/product';
import FilterSidebar from '../../components/FilterSidebar';
import { resolveBackendImageUrl, formatPriceKRW } from '../../utils/asset';

// 백엔드 응답이 필드명이 다르면 여기서만 매핑 변경
function adaptProduct(raw: any): Product {
  return {
    id: raw.id,
    title: raw.name ?? raw.title ?? raw.productName ?? '',
    durationText: raw.duration ?? raw.durationText ?? raw.nightsDays ?? '',
    locationText: raw.region ?? raw.locationText ?? raw.location ?? '',
    imageUrl: resolveBackendImageUrl(raw.thumbnailUrl ?? raw.imageUrl ?? ''),
    rating: Number(raw.rating ?? 0),
    reviewCount: Number(raw.reviewCount ?? raw.reviews ?? 0),
    priceText: raw.priceText ?? formatPriceKRW(raw.price),
    originalPriceText: raw.originalPriceText ?? raw.originalPrice,
    badgeLeft: raw.badgeLeft,
    badgeRight: raw.badgeRight,
  };
}

export default function ProductListPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await productApi.getProducts(); // GET /api/products
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
        setItems([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const totalPages = useMemo(() => {
    const n = Math.ceil(items.length / PAGE_SIZE);
    return Math.max(1, n);
  }, [items.length]);

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, currentPage]);

  const pageButtons = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const last = totalPages;
    const buttons: (number | '...')[] = [1];

    if (currentPage > 3) buttons.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(last - 1, currentPage + 1);
    for (let p = start; p <= end; p++) buttons.push(p);
    if (currentPage < last - 2) buttons.push('...');
    buttons.push(last);

    const uniq: (number | '...')[] = [];
    for (const b of buttons) {
      if (b === '...' && uniq[uniq.length - 1] === '...') continue;
      if (typeof b === 'number' && uniq.includes(b)) continue;
      uniq.push(b);
    }
    return uniq;
  }, [currentPage, totalPages]);

  const totalCountText = useMemo(() => items.length.toLocaleString(), [items.length]);

  const goDetail = (id: Product['id']) => {
    navigate(`/products/${id}`);
  };

  const goPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                onClick={() => {}}
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
                  <div key={i} className="h-[420px] animate-pulse rounded-[12px] bg-slate-200" />
                ))
              : pagedItems.map((item) => (
                  <ProductCard key={item.id} item={item} onClick={goDetail} />
                ))}
          </div>

          <div className="mt-[24px] flex justify-center">
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white disabled:opacity-50"
                aria-label="prev"
                disabled={currentPage === 1}
                onClick={() => goPage(currentPage - 1)}
              >
                <span className="text-[18px] leading-none text-[#94A3B8]">‹</span>
              </button>

              {pageButtons.map((b, idx) =>
                b === '...' ? (
                  <span
                    key={`dots-${idx}`}
                    className="inline-flex h-[40px] items-center px-[4px] text-[14px] font-[500] leading-[20px] text-[#94A3B8]"
                    style={{ fontFamily: 'Plus Jakarta Sans' }}
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={b}
                    type="button"
                    onClick={() => goPage(b)}
                    className={
                      b === currentPage
                        ? 'inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#0066FF] text-[14px] font-[500] leading-[20px] text-white'
                        : 'inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white text-[14px] font-[500] leading-[20px] text-[#0F172A]'
                    }
                    style={{ fontFamily: 'Plus Jakarta Sans' }}
                  >
                    {b}
                  </button>
                ),
              )}

              <button
                type="button"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white disabled:opacity-50"
                aria-label="next"
                disabled={currentPage === totalPages}
                onClick={() => goPage(currentPage + 1)}
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
