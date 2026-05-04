"use client";

import Link from "next/link";
import { Conversation } from "@/data/conversations";

type ConversationRowProps = {
  conversation: Conversation;
  showLabel?: boolean;
};

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-red-500",
];

function getAvatarColor(id: string) {
  const index = parseInt(id.replace(/\D/g, "")) % avatarColors.length;
  return avatarColors[index];
}

function getLabel(conversation: Conversation): { text: string; color: string } | null {
  if (!conversation.pageSubCategory) return null;
  if (conversation.pageSubCategory === "engaged") {
    return { text: "Engaged", color: "bg-green-100 text-green-700" };
  }
  if (conversation.pageSubCategory === "from_ads") {
    return { text: "From Ads", color: "bg-purple-100 text-purple-700" };
  }
  return null;
}

export default function ConversationRow({ conversation, showLabel = false }: ConversationRowProps) {
  const participant = conversation.participants[0];
  const colorClass = getAvatarColor(participant.id);
  const label = showLabel ? getLabel(conversation) : null;

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="relative flex-shrink-0">
        <div
          className={`w-14 h-14 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg`}
        >
          {participant.avatar}
        </div>
        {participant.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <h3
              className={`text-[15px] truncate ${
                conversation.unread ? "font-bold text-gray-900" : "font-medium text-gray-900"
              }`}
            >
              {participant.name}
            </h3>
            {label && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${label.color}`}>
                {label.text}
              </span>
            )}
          </div>
          <span
            className={`text-xs flex-shrink-0 ml-2 ${
              conversation.unread ? "text-messenger-blue font-semibold" : "text-gray-500"
            }`}
          >
            {conversation.lastMessageTime}
          </span>
        </div>
        <p
          className={`text-sm truncate mt-0.5 ${
            conversation.unread ? "text-gray-900 font-semibold" : "text-gray-500"
          }`}
        >
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unread && (
        <div className="w-3 h-3 rounded-full bg-messenger-blue flex-shrink-0" />
      )}
    </Link>
  );
}
