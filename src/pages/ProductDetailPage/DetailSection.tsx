import { useState } from 'react';

type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

type ItineraryDay = {
  day: number;
  title: string;
  schedule: ScheduleItem[];
};

type Props = {
  itinerary: ItineraryDay[];
};

export default function DetailSection({ itinerary }: Props) {
  const [activeDay, setActiveDay] = useState<number>(itinerary[0]?.day ?? 1);

  return (
    <section className="flex flex-col gap-8 w-[730px]" id="detail">
      <h2 className="flex gap-2 items-center">
        <img src="/calendar-icon.svg" />
        <p className="text-textPrimary font-medium text-[24px] flex-1">여행 일정</p>
        <p className="w-[300px] font-medium text-[14px] text-[#64748B]">
          현지 사정에 따라 일정이 다소 변경될 수 있습니다.
        </p>
      </h2>

      {/* 타임라인 */}
      <div className="relative">
        {/* 왼쪽 세로 라인 */}
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[#E2E8F0]" />

        <div className="flex flex-col gap-8">
          {itinerary.map((day) => (
            <div key={day.day} className="relative flex gap-6">
              {/* 배지 영역 */}
              <div className="relative z-10">
                <DayBadge
                  day={day.day}
                  active={activeDay === day.day}
                  onClick={() => setActiveDay(day.day)}
                />
              </div>

              {/* 콘텐츠 영역 */}
              <div className="flex-1">
                <div className="mb-3">
                  <p className="text-textPrimary font-bold text-[18px] h-10 flex items-center">
                    {day.title}
                  </p>
                </div>
                <DayCard day={day} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DayBadge({
  day,
  active,
  onClick,
}: {
  day: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition',
        active
          ? 'bg-primary text-white shadow-md'
          : 'bg-white text-primary border-2 border-primary',
      ].join(' ')}
    >
      {`D${day}`}
    </button>
  );
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-4 py-3">
      <div className="text-[#94A3B8] font-semibold text-[14px]">{item.time}</div>
      <div className="flex flex-col gap-1">
        <p className="text-textPrimary font-semibold text-[14px]">{item.title}</p>
        <p className="text-[#64748B] text-[13px] leading-[18px]">{item.description}</p>
      </div>
    </div>
  );
}

function DayCard({ day }: { day: ItineraryDay }) {
  const imageUrls = day.schedule.map((s) => s.imageUrl).filter(Boolean) as string[];

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E2E8F0] px-6">
      <div className="divide-y divide-[#F1F5F9]">
        {day.schedule.map((item, idx) => (
          <div key={`${day.day}-${idx}`}>
            <ScheduleRow item={item} />
          </div>
        ))}
      </div>

      {imageUrls.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex gap-3">
          {imageUrls.slice(0, 2).map((src) => (
            <div
              key={src}
              className="w-[72px] aspect-square overflow-hidden rounded-[10px] border border-[#E2E8F0]"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
