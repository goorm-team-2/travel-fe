import { useState } from 'react';

type Props = {
  name: string;
  rating: number;
  reviewCount: number;
  departureAirport: string;
  duration: string;
  minDeparture: string;
  price: number;
  isFavorite: boolean;
};

function formatKRW(value: number) {
  return value.toLocaleString('ko-KR') + '원';
}

export default function ProductSummaryCard({
  name,
  rating,
  reviewCount,
  departureAirport,
  duration,
  minDeparture,
  price,
  isFavorite,
}: Props) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggleFavorite = () => {
    const next = !favorite;
    setFavorite(next);
    // TODO: 즐겨찾기 update API 연결
  };

  return (
    <div className="w-[360px] flex flex-col p-6 gap-4 bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm">
      <div className="flex justify-between relative">
        {/* name, rating, reviewCount */}
        <div className="flex flex-col gap-1">
          <h1 className="text-textPrimary font-medium text-[24px] w-[228px]">{name}</h1>
          <div className="flex gap-1">
            <img className="shrink-0" src="/primary-star-icon.svg" />
            <p className="text-primary font-bold text-[14px]">{rating}</p>
            <p className="px-1 text-[#94A3B8] text-[14px]">(리뷰 {reviewCount}개)</p>
          </div>
        </div>
        {/* button */}
        <button className="absolute top-0 right-0 p-2" onClick={handleToggleFavorite}>
          <img src={favorite ? '/primary-heart-icon.svg' : '/heart-icon.svg'} className="w-5 h-5" />
        </button>
      </div>
      {/* 출발지, 여행기간, 최소출발 */}
      <div className="flex flex-col gap-4 py-4 border-t border-b border-[#F1F5F9]">
        <div className="flex text-[14px]">
          <p className="font-medium text-[#64748B] flex-1">출발지</p>
          <p className="text-textPrimary font-semibold">{departureAirport}</p>
        </div>
        <div className="flex text-[14px]">
          <p className="font-medium text-[#64748B] flex-1">여행기간</p>
          <p className="text-textPrimary font-semibold">{duration}</p>
        </div>
        <div className="flex text-[14px]">
          <p className="font-medium text-[#64748B] flex-1">최소출발</p>
          <p className="text-textPrimary font-semibold">{minDeparture}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 pt-2">
        <p className="font-medium text-[#64748B] text-[14px]">성인 1인 기준</p>
        <p className="text-primary font-extrabold text-[30px]">{formatKRW(price)}</p>
      </div>
    </div>
  );
}
