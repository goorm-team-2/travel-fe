import TourCard, { type TourCardData } from '../../../components/TourCard';

export default function TrendingToursSection() {
  // 나중에 API로 교체할 부분 (지금은 더미 데이터)
  const tours: TourCardData[] = [
    {
      id: 1,
      imageSrc: '/images/trending/trending1.png',
      badgeText: '인기 급상승',
      rating: '4.9',
      reviewCountText: '(1,240)',
      title: '런던 템즈강 야경 크루즈 & 디너 투어',
      durationText: '3시간',
      guideText: '한국어 가이드',
      priceText: '₩ 89,000',
    },
    {
      id: 2,
      imageSrc: '/images/trending/trending2.png',
      badgeText: '인기 급상승',
      rating: '4.8',
      reviewCountText: '(856)',
      title: '인도 아그라 타지마할 프라이빗 일출 투어',
      durationText: '8시간',
      guideText: '영어 가이드',
      priceText: '₩ 145,000',
    },
    {
      id: 3,
      imageSrc: '/images/trending/trending3.png',
      badgeText: '매진 임박',
      rating: '5.0',
      reviewCountText: '(2,410)',
      title: '교토 기온거리 전통 기모노 체험 & 스냅 촬영',
      durationText: '2시간',
      guideText: '한국어 지원',
      priceText: '₩ 62,000',
    },
  ];

  const icons = {
    star: '/star.svg',
    heartOutline: '/heart-outline.svg',
    heartFilled: '/heart-filled.svg',
    clock: '/clock.svg',
    lang: '/lang.svg',
  } as const;

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
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              data={{
                ...tour,
                onClickDetail: () => {
                  // 나중에 상세 페이지 라우팅으로 교체
                  console.log('detail:', tour.id);
                },
              }}
              icons={icons}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
