function Field({
  iconSrc,
  label,
  placeholder,
  withDivider = false,
}: {
  iconSrc: string;
  label: string;
  placeholder: string;
  withDivider?: boolean;
}) {
  return (
    <div
      className={[
        'flex h-[58px] items-center gap-[12px] px-[16px] py-[12px]',
        'w-[243px]',
        withDivider ? 'border-r border-[#F1F5F9]' : '',
      ].join(' ')}
    >
      <img src={iconSrc} alt="" className="h-[18px] w-[18px]" />

      <div className="flex flex-col">
        <span className="text-xs text-[#94A3B8]">{label}</span>
        <span className="text-sm font-medium text-[#94A3B8]">{placeholder}</span>
      </div>
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="flex h-[74px] w-[896px] items-center rounded-[12px] bg-white p-[8px]">
      <Field
        iconSrc="/icon-destination.svg"
        label="목적지"
        placeholder="어디로 가시나요?"
        withDivider
      />
      <Field iconSrc="/icon-calendar.svg" label="일정" placeholder="날짜 선택" withDivider />
      <Field iconSrc="/icon-people.svg" label="인원" placeholder="인원 추가" />

      <button
        type="button"
        className="ml-auto flex h-[56px] items-center justify-center gap-[8px] rounded-[8px] bg-[#0166FF] px-[32px] text-white"
        style={{ fontFamily: 'Pretendard', fontWeight: 700, fontSize: 16, lineHeight: '24px' }}
      >
        <img src="/icon-search.svg" alt="" className="h-[18px] w-[18px]" />
        검색하기
      </button>
    </div>
  );
}
