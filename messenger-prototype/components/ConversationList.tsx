"use client";

import { ReactNode } from "react";
import { Conversation } from "@/data/conversations";
import ConversationRow from "./ConversationRow";
import SwipeableConversationRow from "./SwipeableConversationRow";

type ConversationListProps = {
  conversations: Conversation[];
  showLabels?: boolean;
  onConversationTap: (id: string) => void;
  reviewCard?: ReactNode;
  reviewCardPosition?: number;
  onArchive?: (id: string) => void;
  swipeHintShown?: boolean;
  onSwipeHintShown?: () => void;
};

export default function ConversationList({
  conversations,
  showLabels = false,
  onConversationTap,
  reviewCard,
  reviewCardPosition = 3,
  onArchive,
  swipeHintShown = true,
  onSwipeHintShown,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-messenger-gray flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">No conversations yet</p>
      </div>
    );
  }

  // Find the first eligible ad conversation for the swipe hint
  let hintShownForId: string | null = null;
  if (!swipeHintShown && onArchive) {
    const firstEligible = conversations.find(
      (c) => c.lastMessageFromAd && !c.hasUserReplied
    );
    if (firstEligible) hintShownForId = firstEligible.id;
  }

  return (
    <div className="flex-1 overflow-y-auto animate-list-in">
      {conversations.map((conversation, index) => {
        const isSwipeable = onArchive && conversation.lastMessageFromAd && !conversation.hasUserReplied;

        return (
          <div key={conversation.id}>
            {/* Inject review card at position */}
            {reviewCard && index === reviewCardPosition && (
              <div key="review-card">{reviewCard}</div>
            )}

            {isSwipeable ? (
              <SwipeableConversationRow
                conversation={conversation}
                showLabel={showLabels}
                onTap={onConversationTap}
                onArchive={onArchive}
                showSwipeHint={hintShownForId === conversation.id}
                onSwipeHintShown={onSwipeHintShown || (() => {})}
              />
            ) : (
              <ConversationRow
                conversation={conversation}
                showLabel={showLabels}
                onTap={onConversationTap}
              />
            )}
          </div>
        );
      })}
      {/* If reviewCard position is beyond list length, show it at the end */}
      {reviewCard && reviewCardPosition >= conversations.length && (
        <div key="review-card">{reviewCard}</div>
      )}
    </div>
  );
}
