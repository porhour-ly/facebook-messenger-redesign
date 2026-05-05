"use client";

import { Conversation } from "@/data/conversations";

type ConversationRowProps = {
  conversation: Conversation;
  showLabel?: boolean;
  onTap: (id: string) => void;
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
  if (conversation.category !== "pages") return null;
  if (conversation.lastMessageFromAd) {
    return { text: "From Ad", color: "bg-purple-100 text-purple-700" };
  }
  return null;
}

export default function ConversationRow({ conversation, showLabel = false, onTap }: ConversationRowProps) {
  const participant = conversation.participants[0];
  const colorClass = getAvatarColor(participant.id);
  const label = showLabel ? getLabel(conversation) : null;

  return (
    <button
      onClick={() => onTap(conversation.id)}
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-left"
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
        <div className="flex items-center gap-2 min-w-0">
          <h3
            className={`text-[15px] truncate ${
              conversation.unread ? "font-bold text-gray-900" : "font-normal text-gray-900"
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
        <p className="flex items-center gap-0 mt-0.5 min-w-0">
          <span
            className={`text-[13px] truncate ${
              conversation.unread ? "text-gray-900 font-semibold" : "text-gray-500"
            }`}
          >
            {conversation.lastMessage}
          </span>
          <span className="text-[13px] text-gray-500 flex-shrink-0">
            {" "}
            · {conversation.lastMessageTime}
          </span>
        </p>
      </div>
      {conversation.unread && (
        <div className="w-3 h-3 rounded-full bg-messenger-blue flex-shrink-0" />
      )}
    </button>
  );
}
