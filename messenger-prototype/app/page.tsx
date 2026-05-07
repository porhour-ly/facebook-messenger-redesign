"use client";

import { useState, useMemo, useCallback } from "react";
import TopBar from "@/components/TopBar";
import TabBar, { TabType } from "@/components/TabBar";
import SubTabBar, { SubTabType } from "@/components/SubTabBar";
import ConversationList from "@/components/ConversationList";
import ActiveNowRow from "@/components/ActiveNowRow";
import ChatView from "@/components/ChatView";
import BottomNav from "@/components/BottomNav";
import ReviewCard from "@/components/ReviewCard";
import UndoToast from "@/components/UndoToast";
import { conversations as initialConversations, Conversation, Message } from "@/data/conversations";

type ViewState = "inbox" | "chat-entering" | "chat" | "chat-leaving";

export default function InboxPage() {
  const [allConversations, setAllConversations] = useState<Conversation[]>(
    () => initialConversations.map((c) => ({ ...c, messages: [...c.messages] }))
  );
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("all");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("inbox");

  // --- Cleanup state (Concepts 2 & 3) ---
  const [reviewCardDismissed, setReviewCardDismissed] = useState(false);
  const [swipeHintShown, setSwipeHintShown] = useState(false);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [lastArchivedIds, setLastArchivedIds] = useState<string[]>([]);
  const [undoMessage, setUndoMessage] = useState("");

  // --- Derived data ---
  const inactiveAdConversations = useMemo(
    () => allConversations.filter(
      (c) => c.lastMessageFromAd && !c.hasUserReplied && !c.archived
    ),
    [allConversations]
  );

  const unreadCounts = useMemo(() => {
    const counts: Record<TabType, number> = {
      all: 0, friends: 0, groups: 0, pages: 0, marketplace: 0,
    };
    allConversations.forEach((conv) => {
      if (conv.unread && !conv.archived) {
        counts.all++;
        counts[conv.category]++;
      }
    });
    return counts;
  }, [allConversations]);

  const filteredConversations = useMemo(() => {
    let filtered = allConversations.filter((c) => !c.archived);

    if (activeTab !== "all") {
      filtered = filtered.filter((c) => c.category === activeTab);
    }

    if (activeTab === "pages" && activeSubTab === "engaged") {
      filtered = filtered.filter((c) => c.hasUserReplied === true);
    } else if (activeTab === "pages" && activeSubTab === "requested") {
      filtered = filtered.filter((c) => c.hasUserReplied === false);
    }

    return filtered;
  }, [allConversations, activeTab, activeSubTab]);

  const activeConversation = useMemo(
    () => allConversations.find((c) => c.id === activeConversationId) || null,
    [allConversations, activeConversationId]
  );

  const chatVisible = viewState !== "inbox";

  // --- Archive helpers ---
  const archiveConversation = useCallback((id: string) => {
    setAllConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, archived: true } : c))
    );
    setLastArchivedIds([id]);
    const conv = allConversations.find((c) => c.id === id);
    setUndoMessage(`Archived ${conv?.participants[0]?.name || "conversation"}`);
    setShowUndoToast(true);
  }, [allConversations]);

  const archiveConversations = useCallback((ids: string[]) => {
    setAllConversations((prev) =>
      prev.map((c) => (ids.includes(c.id) ? { ...c, archived: true } : c))
    );
    setLastArchivedIds(ids);
    setUndoMessage(`Archived ${ids.length} conversation${ids.length !== 1 ? "s" : ""}`);
    setShowUndoToast(true);
  }, []);

  const undoArchive = useCallback(() => {
    setAllConversations((prev) =>
      prev.map((c) => (lastArchivedIds.includes(c.id) ? { ...c, archived: false } : c))
    );
    setShowUndoToast(false);
    setLastArchivedIds([]);
  }, [lastArchivedIds]);

  // --- Core inbox handlers ---
  const markAsRead = useCallback((id: string) => {
    setAllConversations((prev) =>
      prev.map((c) => (c.id === id && c.unread ? { ...c, unread: false } : c))
    );
  }, []);

  const handleMessageSent = useCallback((conversationId: string, message: Message) => {
    setAllConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: [...c.messages, message],
          lastMessage: message.text,
          lastMessageTime: "now",
          hasUserReplied: true,
          lastMessageFromAd: false,
        };
      })
    );
  }, []);

  const handleReplyReceived = useCallback((conversationId: string, message: Message) => {
    setAllConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: [...c.messages, message],
          lastMessage: message.text,
          lastMessageTime: "now",
        };
      })
    );
  }, []);

  const openChat = useCallback((id: string) => {
    setActiveConversationId(id);
    markAsRead(id);
    setViewState("chat-entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setViewState("chat");
      });
    });
  }, [markAsRead]);

  const closeChat = useCallback(() => {
    setViewState("chat-leaving");
    setTimeout(() => {
      setViewState("inbox");
      setActiveConversationId(null);
    }, 300);
  }, []);

  // --- Transform styles ---
  const inboxTransform =
    viewState === "chat" ? "translateX(-30%) scale(0.95)" :
    viewState === "chat-leaving" ? "translateX(0) scale(1)" :
    "translateX(0) scale(1)";

  const inboxOpacity = viewState === "chat" ? 0.4 : 1;

  const chatTransform =
    viewState === "chat-entering" ? "translateX(100%)" :
    viewState === "chat-leaving" ? "translateX(100%)" :
    "translateX(0)";

  const showReviewCard = (activeTab === "all" || (activeTab === "pages" && activeSubTab === "all")) && inactiveAdConversations.length >= 3 && !reviewCardDismissed;

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
          showLabels={activeTab === "all" || activeTab === "pages"}
          onConversationTap={openChat}
          reviewCard={
            showReviewCard ? (
              <ReviewCard
                inactiveCount={inactiveAdConversations.length}
                onArchiveAll={() => archiveConversations(inactiveAdConversations.map((c) => c.id))}
                onReview={() => {
                  setActiveTab("pages");
                  setActiveSubTab("requested");
                  setReviewCardDismissed(true);
                }}
                onDismiss={() => setReviewCardDismissed(true)}
              />
            ) : undefined
          }
          reviewCardPosition={3}
          onArchive={archiveConversation}
          swipeHintShown={swipeHintShown}
          onSwipeHintShown={() => setSwipeHintShown(true)}
        />
        <BottomNav unreadCount={unreadCounts.all} />
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
          <ChatView
            conversation={activeConversation}
            onBack={closeChat}
            onMessageSent={handleMessageSent}
            onReplyReceived={handleReplyReceived}
          />
        </div>
      )}

      {/* Undo Toast */}
      {showUndoToast && (
        <UndoToast
          message={undoMessage}
          onUndo={undoArchive}
          onExpire={() => setShowUndoToast(false)}
        />
      )}
    </div>
  );
}
