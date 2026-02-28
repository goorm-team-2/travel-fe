import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationCard from './DestinationCard';
import { productApi } from '../../../api/productApi';
import type { FeaturedProduct } from '../../../types/product';
import { resolveBackendImageUrl } from '../../../utils/asset';

function ArrowIcon() {
  return (
    <svg
      width="5.55"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="translate-y-[1px]"
    >
      <path
        d="M1 1L4.5 4.5L1 8"
        stroke="#0166FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// UI 확인용 더미
const FALLBACK_FEATURED: FeaturedProduct[] = [
  { id: 1, title: '도쿄/일본', priceText: '₩ 245,000 ~', imageUrl: '/images/featured/tokyo.png' },
  {
    id: 2,
    title: '제주도/대한민국',
    priceText: '₩ 32,000 ~',
    imageUrl: '/images/featured/jeju.png',
  },
  {
    id: 3,
    title: '파리/프랑스',
    priceText: '₩ 1,120,000 ~',
    imageUrl: '/images/featured/paris.png',
  },
  { id: 4, title: '방콕/태국', priceText: '₩ 380,000 ~', imageUrl: '/images/featured/bangkok.png' },
];

function normalizeImagePath(url: string) {
  if (!url) return url;

  if (url.startsWith('/images/featured/')) return url;
  if (url.startsWith('/images/')) return resolveBackendImageUrl(url);

  return url;
}

function adaptFeatured(raw: any): FeaturedProduct {
  return {
    id: raw.id,
    title: raw.region ?? raw.title ?? '',
    priceText:
      typeof raw.price === 'number' ? `₩${raw.price.toLocaleString()} ~` : (raw.priceText ?? ''),
    imageUrl: normalizeImagePath(raw.thumbnailUrl ?? raw.imageUrl ?? ''),
  };
}

export default function FeaturedDestinationsSection() {
  const navigate = useNavigate();
  const [items, setItems] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await productApi.getFeaturedProducts(); // GET /api/products/featured
        const data = res?.data;

        if (!alive) return;

        if (Array.isArray(data)) {
          setItems(data.map(adaptFeatured));
        } else {
          setItems([]);
        }
      } catch (e) {
        console.error('[getFeaturedProducts] failed:', e);
        if (!alive) return;
        setItems(FALLBACK_FEATURED);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="w-full pt-[80px] pb-[120px]">
      <div className="mx-auto w-full max-w-[1280px] px-[32px]">
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-[14px] font-bold leading-[20px] tracking-[2.8px] text-[#0166FF]"
              style={{ fontFamily: 'Pretendard' }}
            >
              RECOMMENDED
            </p>

            <h2
              className="mt-2 text-[30px] font-bold leading-[36px] text-[#0F172A]"
              style={{ fontFamily: 'Pretendard', letterSpacing: '-0.75px' }}
            >
              지금 가장 인기 있는 여행지
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-[14px] font-bold leading-[20px] text-[#0166FF]"
            style={{ fontFamily: 'Pretendard' }}
          >
            모두 보기 <ArrowIcon />
          </button>
        </div>

        <div className="mt-10 flex w-full gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[349.33px] w-[262px] animate-pulse rounded-[8px] bg-slate-200"
                />
              ))
            : items.slice(0, 4).map((item) => <DestinationCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
