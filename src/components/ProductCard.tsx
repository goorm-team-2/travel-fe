import type { Product } from '../types/product';

export default function ProductCard({
  item,
  onClick,
}: {
  item: Product;
  onClick?: (id: Product['id']) => void;
}) {
  const showBadges = Boolean(item.badgeLeft || item.badgeRight);

  return (
    <article
      className="w-full overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white cursor-pointer"
      onClick={() => onClick?.(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.(item.id);
      }}
    >
      <div className="relative h-[218.48px] w-full">
        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute right-[12px] top-[12px] inline-flex h-[32px] w-[32px] items-center justify-center rounded-[9999px] bg-[rgba(255,255,255,0.20)] p-[8px] backdrop-blur-[12px]"
          aria-label="like"
        >
          <img src="/heart2.svg" alt="heart" className="h-[18px] w-[18px]" />
        </button>

        {showBadges ? (
          <div className="absolute left-[12px] top-[156px] flex gap-[8px]">
            {item.badgeLeft ? (
              <span
                className="inline-flex h-[23px] items-center rounded-[4px] bg-[#0066FF] px-[8px] py-[4px] text-[10px] font-[700] leading-[15px] text-white"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {item.badgeLeft}
              </span>
            ) : null}

            {item.badgeRight ? (
              <span
                className="inline-flex h-[23px] items-center rounded-[4px] bg-[rgba(0,0,0,0.60)] px-[8px] py-[4px] text-[10px] font-[700] leading-[15px] text-white"
                style={{ fontFamily: 'Noto Sans KR' }}
              >
                {item.badgeRight}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex min-h-[193.5px] flex-col gap-[8px] p-[20px]">
        <div className="flex items-center gap-[6px]">
          <img src="/pin.svg" alt="pin" className="h-[12px] w-[12px]" />
          <span
            className="text-[12px] font-[400] leading-[16px] text-[#64748B]"
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            {item.locationText}
          </span>
        </div>

        <h3
          className="overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-[700] leading-[28px] text-[#0F172A]"
          style={{ fontFamily: 'Noto Sans KR' }}
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[6px]">
            <img src="/star1.svg" alt="star" className="h-[11px] w-[11px]" />
            <span
              className="text-[14px] font-[600] leading-[20px] text-[#0F172A]"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {item.rating?.toFixed?.(1) ?? item.rating}
            </span>
          </div>

          <span
            className="text-[12px] font-[400] leading-[16px] text-[#94A3B8]"
            style={{ fontFamily: 'Plus Jakarta Sans' }}
          >
            ({item.reviewCount} 리뷰)
          </span>
        </div>

        <div className="my-[8px] h-[1px] w-full bg-[#E2E8F0]" />

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col gap-[6px]">
            {item.originalPriceText ? (
              <span
                className="text-[12px] font-[400] leading-[16px] text-[#94A3B8] line-through"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {item.originalPriceText}
              </span>
            ) : (
              <span className="h-[16px]" />
            )}

            <span
              className="text-[20px] font-[800] leading-[28px] text-[#0066FF]"
              style={{ fontFamily: 'Pretendard' }}
            >
              {item.priceText}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(item.id);
            }}
            className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[rgba(0,102,255,0.10)] p-[8px]"
            aria-label="go"
          >
            <img src="/card-arrow.svg" alt="arrow" className="h-[16px] w-[16px]" />
          </button>
        </div>
      </div>
    </article>
  );
}
