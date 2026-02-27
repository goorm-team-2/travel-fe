type Props = {
  includes: string[];
  excludes: string[];
};

export default function IncludesExcludes({ includes, excludes }: Props) {
  return (
    <section id="notice" className="bg-white rounded-[16px] p-8 w-[730px] grid grid-cols-2 gap-8">
      {/* 포함 사항 */}
      <div className="flex gap-4 flex-col">
        <h3 className="flex font-medium text-[18px]">
          <img className="mr-2" src="/inclusion-icon.svg" />
          포함 사항
        </h3>
        <ul className="flex flex-col gap-3 font-medium text-[14px] text-[#475569]">
          {includes.map((item, index) => (
            <li key={index}>
              <span>• {item}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* 불포함 사항 */}
      <div className="flex gap-4 flex-col">
        <h3 className="flex font-medium text-[18px]">
          <img className="mr-2" src="/exclusion-icon.svg" />
          불포함 사항
        </h3>
        <ul className="flex flex-col gap-3 font-medium text-[14px] text-[#475569]">
          {excludes.map((item, index) => (
            <li key={index}>
              <span>• {item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
