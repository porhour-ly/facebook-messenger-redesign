"use client";

import { Conversation } from "@/data/conversations";
import ConversationRow from "./ConversationRow";

type ConversationListProps = {
  conversations: Conversation[];
  showLabels?: boolean;
  onConversationTap: (id: string) => void;
};

export default function ConversationList({ conversations, showLabels = false, onConversationTap }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-messenger-gray flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto animate-list-in">
      {conversations.map((conversation) => (
        <ConversationRow
          key={conversation.id}
          conversation={conversation}
          showLabel={showLabels}
          onTap={onConversationTap}
        />
      ))}
    </div>
  );
}
