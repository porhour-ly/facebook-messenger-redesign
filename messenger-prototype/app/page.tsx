"use client";

import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import TabBar, { TabType } from "@/components/TabBar";
import SubTabBar, { SubTabType } from "@/components/SubTabBar";
import ConversationList from "@/components/ConversationList";
import ActiveNowRow from "@/components/ActiveNowRow";
import { conversations } from "@/data/conversations";

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("all");

  const unreadCounts = useMemo(() => {
    const counts: Record<TabType, number> = {
      all: 0,
      friends: 0,
      groups: 0,
      pages: 0,
      marketplace: 0,
    };

    conversations.forEach((conv) => {
      if (conv.unread) {
        counts.all++;
        counts[conv.category]++;
      }
    });

    return counts;
  }, []);

  const filteredConversations = useMemo(() => {
    let filtered = conversations;

    if (activeTab !== "all") {
      filtered = filtered.filter((c) => c.category === activeTab);
    }

    if (activeTab === "pages" && activeSubTab !== "all") {
      filtered = filtered.filter((c) => c.pageSubCategory === activeSubTab);
    }

    return filtered;
  }, [activeTab, activeSubTab]);

  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <TabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveSubTab("all");
        }}
        unreadCounts={unreadCounts}
      />
      {activeTab === "pages" && (
        <SubTabBar activeSubTab={activeSubTab} onSubTabChange={setActiveSubTab} />
      )}
      {activeTab === "friends" && <ActiveNowRow />}
      <ConversationList
        conversations={filteredConversations}
        showLabels={activeTab === "pages" && activeSubTab === "all"}
      />
    </div>
  );
}
