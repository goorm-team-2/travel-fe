import React, { useState } from 'react';

export type TourCardData = {
  id: number | string;
  imageSrc: string;
  badgeText?: string;

  rating: string;
  reviewCountText: string;

  title: string;

  durationText: string;
  guideText: string;

  priceText: string;
  onClickDetail?: () => void;
};

type IconSrc = {
  star: string;
  heartOutline: string;
  heartFilled: string;
  clock: string;
  lang: string;
};

export default function TourCard({ data, icons }: { data: TourCardData; icons: IconSrc }) {
  const [liked, setLiked] = useState(false);

  const badgeBgColor = data.badgeText === '매진 임박' ? 'bg-[#F59E0B]' : 'bg-[#0166FF]';

  const handleCardClick = () => {
    data.onClickDetail?.();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      data.onClickDetail?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="w-[352px] h-[404.5px] rounded-[8px] border border-[#F1F5F9] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer"
    >
      <div className="relative w-[350px] h-[224px] mx-auto mt-[1px]">
        <img src={data.imageSrc} alt="" className="h-full w-full object-cover" draggable={false} />

        {data.badgeText ? (
          <div
            className={`absolute left-[16px] top-[16px] h-[24px] rounded-[8px] px-[12px] py-[4px] flex items-center justify-center ${badgeBgColor}`}
          >
            <span className="text-[12px] font-[700] leading-[16px] text-white whitespace-nowrap">
              {data.badgeText}
            </span>
          </div>
        ) : null}

        <button
          type="button"
          aria-label="like"
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          className="absolute right-[16px] top-[16px] h-[36px] w-[36px] rounded-full bg-white/80 backdrop-blur-[4px] flex items-center justify-center"
        >
          <img
            src={liked ? icons.heartFilled : icons.heartOutline}
            alt=""
            className="w-[20px] h-[18.35px]"
            draggable={false}
          />
        </button>
      </div>

      <div className="w-[350px] mx-auto h-[178.5px] p-[24px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-[6px]">
            <img src={icons.star} alt="" className="w-[11.67px] h-[11.08px]" draggable={false} />
            <span className="h-[20px] text-[14px] font-[700] leading-[20px] text-[#0F172A]">
              {data.rating}
            </span>
            <span className="h-[16px] text-[12px] font-[400] leading-[16px] text-[#94A3B8]">
              {data.reviewCountText}
            </span>
          </div>

          <p className="mt-[8px] text-[18px] font-[700] leading-[22.5px] text-[#0F172A] whitespace-nowrap">
            {data.title}
          </p>

          <div className="mt-[10px] flex items-center gap-[16px] text-[#64748B]">
            <div className="flex items-center gap-[6px]">
              <img src={icons.clock} alt="" className="w-[15px] h-[15px]" draggable={false} />
              <span className="text-[14px] font-[400] leading-[20px] text-[#64748B]">
                {data.durationText}
              </span>
            </div>

            <div className="flex items-center gap-[6px]">
              <img src={icons.lang} alt="" className="w-[16.58px] h-[15px]" draggable={false} />
              <span className="text-[14px] font-[400] leading-[20px] text-[#64748B]">
                {data.guideText}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-[20px] font-[800] leading-[28px] text-[#0166FF]">
            {data.priceText}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              data.onClickDetail?.();
            }}
            className="h-[36px] w-[95px] rounded-[8px] px-[16px] py-[8px] bg-[#0066FF]/10 flex items-center justify-center"
          >
            <span className="text-[14px] font-[700] leading-[20px] text-[#0166FF] whitespace-nowrap">
              자세히 보기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
