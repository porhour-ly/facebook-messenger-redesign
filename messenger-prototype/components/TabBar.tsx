"use client";

export type TabType = "all" | "friends" | "groups" | "pages" | "marketplace";

type TabBarProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCounts: Record<TabType, number>;
};

const tabs: { id: TabType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "friends", label: "Friends" },
  { id: "groups", label: "Groups" },
  { id: "pages", label: "Pages" },
  { id: "marketplace", label: "Marketplace" },
];

export default function TabBar({ activeTab, onTabChange, unreadCounts }: TabBarProps) {
  return (
    <div className="px-4 py-2 overflow-x-auto hide-scrollbar">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-messenger-lightBlue text-messenger-blue"
                : "bg-messenger-gray text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
            {unreadCounts[tab.id] > 0 && (
              <span className={`ml-1.5 text-xs font-semibold ${
                activeTab === tab.id ? "text-messenger-blue/60" : "text-gray-400"
              }`}>
                {unreadCounts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
