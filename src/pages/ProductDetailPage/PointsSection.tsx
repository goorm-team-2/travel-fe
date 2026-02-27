type Props = {
  highlights: string[];
};

export default function PointsSection({ highlights }: Props) {
  return (
    <section id="points" className="w-[730px] flex flex-col gap-6">
      <h2 className="flex gap-2">
        <img src="/points-icon.svg" />
        <p className="text-textPrimary font-medium text-[24px]">상품 포인트</p>
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {highlights.map((point, idx) => (
          <PointItem key={idx} text={point} />
        ))}
      </div>
    </section>
  );
}

function PointItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-[12px] p-5 border border-[#F1F5F9]">
      <img className="mt-[2px] shrink-0" src="/camera-icon.svg" alt="" />
      <p className="text-[16px] text-textPrimary font-medium">{text}</p>
    </div>
  );
}
