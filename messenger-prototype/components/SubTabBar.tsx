"use client";

export type SubTabType = "all" | "engaged" | "requested";

type SubTabBarProps = {
  activeSubTab: SubTabType;
  onSubTabChange: (tab: SubTabType) => void;
};

const subTabs: { id: SubTabType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engaged", label: "Engaged" },
  { id: "requested", label: "Requested" },
];

export default function SubTabBar({ activeSubTab, onSubTabChange }: SubTabBarProps) {
  return (
    <div className="px-4 py-1">
      <div className="flex gap-1 bg-messenger-gray rounded-lg p-1">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSubTabChange(tab.id)}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              activeSubTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
