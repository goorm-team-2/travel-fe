import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TourCard, { type TourCardData } from '../../../components/TourCard';
import { productApi } from '../../../api/productApi';

type RawProduct = {
  id: number;
  thumbnailUrl: string;
  name: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price: number;
};

function formatPriceKRW(price: number) {
  return `₩ ${price.toLocaleString('ko-KR')}`;
}

function fixImageUrl(url: string) {
  if (url.startsWith('http')) return url;
  return `http://localhost:8081${url}`;
}

export default function TrendingToursSection() {
  const navigate = useNavigate();
  const [tours, setTours] = useState<TourCardData[]>([]);
  const [loading, setLoading] = useState(true);

  const icons = {
    star: '/star.svg',
    heartOutline: '/heart-outline.svg',
    heartFilled: '/heart-filled.svg',
    clock: '/clock.svg',
    lang: '/lang.svg',
  } as const;

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        const res = await productApi.getProducts(); // GET /api/products
        const data = res?.data as RawProduct[];

        if (!alive) return;

        const pick = Array.isArray(data) ? data.slice(0, 3) : [];

        const badgeByIndex = ['인기 급상승', '인기 급상승', '매진 임박'];

        const mapped: TourCardData[] = pick.map((p, idx) => ({
          id: p.id,
          imageSrc: fixImageUrl(p.thumbnailUrl),
          badgeText: badgeByIndex[idx] ?? '추천',
          rating: String((p.rating ?? 0).toFixed(1)),
          reviewCountText: `(${(p.reviewCount ?? 0).toLocaleString('ko-KR')})`,
          title: p.name,
          durationText: p.duration,
          guideText: idx === 1 ? '영어 가이드' : '한국어 가이드',
          priceText: formatPriceKRW(p.price ?? 0),
        }));

        setTours(
          mapped.map((t) => ({
            ...t,
            onClickDetail: () => navigate(`/products/${t.id}`),
          })),
        );
      } catch (e) {
        console.error('[TrendingToursSection] getProducts failed:', e);

        setTours([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [navigate]);

  return (
    <section className="w-full pt-[80px] pb-[80px]">
      <div className="mx-auto w-full max-w-[1280px] px-[32px]">
        <div>
          <p className="h-[20px] text-[14px] font-[700] leading-[20px] tracking-[2.8px] text-[#0166FF] uppercase">
            Top Experiences
          </p>

          <h2 className="mt-[8px] h-[36px] text-[30px] font-[700] leading-[36px] tracking-[-0.75px] text-[#0F172A]">
            놓치면 아쉬운 트렌딩 투어
          </h2>
        </div>

        <div className="mt-[32px] flex h-[404.5px] w-[1120px] gap-[32px]">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[404.5px] w-[352px] animate-pulse rounded-[12px] border border-[#E2E8F0] bg-slate-200"
                />
              ))
            : tours.map((tour) => <TourCard key={tour.id} data={tour} icons={icons} />)}
        </div>
      </div>
    </section>
  );
}
