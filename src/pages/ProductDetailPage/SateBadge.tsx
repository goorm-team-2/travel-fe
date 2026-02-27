export default function SafeBadge() {
  return (
    <div className="w-[360px] bg-[#EFF6FF] rounded-[12px] flex p-4 gap-3">
      <img src="/safe-icon.svg" />
      <div className="flex flex-col">
        <p className="font-medium text-[14px] text-textPrimary">안심 예약 서비스</p>
        <p className="text-[#475569] text-[12px]">출발 14일 전까지 100% 무료 취소 가능</p>
      </div>
    </div>
  );
}
