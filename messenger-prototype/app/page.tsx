"use client";

import { useState, useMemo, useCallback } from "react";
import TopBar from "@/components/TopBar";
import TabBar, { TabType } from "@/components/TabBar";
import SubTabBar, { SubTabType } from "@/components/SubTabBar";
import ConversationList from "@/components/ConversationList";
import ActiveNowRow from "@/components/ActiveNowRow";
import ChatView from "@/components/ChatView";
import { conversations } from "@/data/conversations";

type ViewState = "inbox" | "chat-entering" | "chat" | "chat-leaving";

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("all");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("inbox");

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

    if (activeTab === "pages" && activeSubTab === "engaged") {
      filtered = filtered.filter((c) => c.hasUserReplied === true);
    } else if (activeTab === "pages" && activeSubTab === "requested") {
      filtered = filtered.filter((c) => c.hasUserReplied === false);
    }

    return filtered;
  }, [activeTab, activeSubTab]);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) || null,
    [activeConversationId]
  );

  const chatVisible = viewState !== "inbox";

  const openChat = useCallback((id: string) => {
    setActiveConversationId(id);
    setViewState("chat-entering");
    // Force a paint with the chat off-screen, then slide it in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setViewState("chat");
      });
    });
  }, []);

  const closeChat = useCallback(() => {
    setViewState("chat-leaving");
    setTimeout(() => {
      setViewState("inbox");
      setActiveConversationId(null);
    }, 300);
  }, []);

  const inboxTransform =
    viewState === "chat" ? "translateX(-30%) scale(0.95)" :
    viewState === "chat-leaving" ? "translateX(0) scale(1)" :
    "translateX(0) scale(1)";

  const inboxOpacity =
    viewState === "chat" ? 0.4 : 1;

  const chatTransform =
    viewState === "chat-entering" ? "translateX(100%)" :
    viewState === "chat-leaving" ? "translateX(100%)" :
    "translateX(0)";

  return (
    <div className="relative h-full overflow-hidden bg-white">
      {/* Inbox layer */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          transform: inboxTransform,
          opacity: inboxOpacity,
          transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
        }}
      >
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
          key={`${activeTab}-${activeSubTab}`}
          conversations={filteredConversations}
          showLabels={activeTab === "pages"}
          onConversationTap={openChat}
        />
      </div>

      {/* Chat layer */}
      {chatVisible && activeConversation && (
        <div
          className="absolute inset-0 bg-white"
          style={{
            transform: chatTransform,
            transition: "transform 300ms ease-in-out",
          }}
        >
          <ChatView conversation={activeConversation} onBack={closeChat} />
        </div>
      )}
    </div>
  );
}
