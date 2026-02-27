import { useMemo, useState } from 'react';

type RatingOption = {
  key: string;
  label: string;
};

type ThemeOption = {
  key: string;
  label: string;
};

const RATING_OPTIONS: RatingOption[] = [
  { key: '4.5', label: '4.5 이상' },
  { key: '4.0', label: '4.0 이상' },
  { key: '3.5', label: '3.5 이상' },
];

const THEME_OPTIONS: ThemeOption[] = [
  { key: 'all', label: '#전체' },
  { key: 'family', label: '#가족여행' },
  { key: 'couple', label: '#커플/허니문' },
  { key: 'healing', label: '#힐링/온천' },
  { key: 'adventure', label: '#모험/액티비티' },
  { key: 'food', label: '#미식투어' },
];

export default function FilterSidebar() {
  const [selectedThemes, setSelectedThemes] = useState<Set<string>>(() => new Set(['all']));
  const themeRows = useMemo(() => THEME_OPTIONS, []);

  const toggleTheme = (key: string) => {
    setSelectedThemes((prev) => {
      const next = new Set(prev);

      if (key === 'all') {
        if (next.has('all') && next.size === 1) {
          next.delete('all');
        } else {
          next.clear();
          next.add('all');
        }
        return next;
      }

      next.delete('all');

      if (next.has(key)) next.delete(key);
      else next.add(key);

      return next;
    });
  };

  const reset = () => {
    setSelectedThemes(new Set(['all']));
  };

  return (
    <aside className="w-[260px] shrink-0 rounded-[16px] border border-[#E2E8F0] bg-white p-[20px]">
      <div className="flex items-start justify-between">
        <h2
          className="text-[18px] font-[700] leading-[28px] text-[#0F172A]"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          필터
        </h2>

        <button
          type="button"
          className="text-[12px] font-[500] leading-[16px] text-[#0066FF]"
          style={{ fontFamily: 'Noto Sans KR' }}
          onClick={reset}
        >
          초기화
        </button>
      </div>

      <div className="mt-[20px]">
        <p
          className="text-[14px] font-[700] leading-[20px] text-[#0F172A]"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          가격 범위 (원)
        </p>

        <div className="mt-[12px]">
          <div className="h-[8px] w-[206px] rounded-[8px] bg-[#E2E8F0]" />
          <div className="mt-[10px] flex w-[206px] items-center justify-between">
            <span
              className="text-[12px] font-[400] leading-[16px] text-[#64748B]"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              0원
            </span>
            <span
              className="text-[12px] font-[400] leading-[16px] text-[#64748B]"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              100만원+
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[26px]">
        <p
          className="text-[14px] font-[700] leading-[20px] text-[#0F172A]"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          평점
        </p>

        <div className="mt-[12px] flex flex-col gap-[12px]">
          {RATING_OPTIONS.map((opt) => (
            <label key={opt.key} className="flex items-center gap-[12px]">
              <span className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-[4px] border border-[#CBD5E1] bg-white" />
              <img
                src="/star1.svg"
                alt="star"
                className="h-[14.25px] w-[15px] translate-y-[0.5px]"
              />
              <span
                className="text-[14px] font-[400] leading-[20px] text-[#0F172A]"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-[26px]">
        <p
          className="text-[14px] font-[700] leading-[20px] text-[#0F172A]"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          여행 테마
        </p>

        <div className="mt-[14px] flex flex-wrap gap-[10px]">
          {themeRows.map((t) => {
            const isActive = selectedThemes.has(t.key);

            return (
              <button
                key={t.key}
                type="button"
                className={[
                  'h-[30px] rounded-[9999px] border px-[12px] text-center text-[12px] font-[500] leading-[16px]',
                  isActive
                    ? 'border-[#0066FF] bg-[rgba(0,102,255,0.10)] text-[#0066FF]'
                    : 'border-[#CBD5E1] bg-white text-[#0F172A]',
                ].join(' ')}
                style={{ fontFamily: 'Noto Sans KR' }}
                onClick={() => toggleTheme(t.key)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
