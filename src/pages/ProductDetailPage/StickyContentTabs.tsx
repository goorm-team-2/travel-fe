import { useState } from 'react';

type Tab = {
  id: string;
  label: string;
};

type Props = {
  tabs: Tab[];
};

export default function StickyTabs({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <nav className="w-[1200px] mx-auto mb-8 sticky top-0 z-20 bg-background border-b border-[#E2E8F0] flex gap-8">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          onClick={() => setActiveTab(tab.id)}
          className={`block pt-[15.5px] pb-[12.5px] font-medium text-[16px] z-22
                ${
                  activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-[#64748B]'
                }
              `}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
