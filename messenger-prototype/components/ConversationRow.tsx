"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Conversation } from "@/data/conversations";

type ConversationRowProps = {
  conversation: Conversation;
  showLabel?: boolean;
  onTap: (id: string) => void;
  selectionMode?: boolean;
  selected?: boolean;
  onLongPress?: (id: string) => void;
  onToggleSelect?: (id: string) => void;
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

export default function ConversationRow({
  conversation,
  showLabel = false,
  onTap,
  selectionMode = false,
  selected = false,
  onLongPress,
  onToggleSelect,
}: ConversationRowProps) {
  const participant = conversation.participants[0];
  const colorClass = getAvatarColor(participant.id);
  const label = showLabel ? getLabel(conversation) : null;
  const [imgError, setImgError] = useState(false);

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const isTouchRef = useRef(false);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  const clearTimer = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const startLongPress = useCallback(
    (x: number, y: number) => {
      if (selectionMode) return;
      didLongPress.current = false;
      startPos.current = { x, y };
      clearTimer();
      longPressTimer.current = setTimeout(() => {
        longPressTimer.current = null;
        didLongPress.current = true;
        onLongPress?.(conversation.id);
      }, 500);
    },
    [selectionMode, onLongPress, conversation.id, clearTimer]
  );

  // --- Touch events (mobile) ---
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isTouchRef.current = true;
      didLongPress.current = false;
      const t = e.touches[0];
      if (t) startLongPress(t.clientX, t.clientY);
    },
    [startLongPress]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      if (!startPos.current || !t) return;
      const dx = Math.abs(t.clientX - startPos.current.x);
      const dy = Math.abs(t.clientY - startPos.current.y);
      if (dx > 10 || dy > 10) clearTimer();
    },
    [clearTimer]
  );

  const handleTouchEnd = useCallback(() => {
    clearTimer();
    startPos.current = null;
  }, [clearTimer]);

  // --- Mouse events (desktop) ---
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isTouchRef.current) return; // skip compat mouse events from touch
      didLongPress.current = false;
      startLongPress(e.clientX, e.clientY);
    },
    [startLongPress]
  );

  const handleMouseUp = useCallback(() => {
    if (isTouchRef.current) return;
    clearTimer();
    startPos.current = null;
  }, [clearTimer]);

  // --- Click handler ---
  const handleClick = useCallback(() => {
    // Suppress the click that follows a long press (in any mode)
    if (didLongPress.current) {
      didLongPress.current = false;
      return;
    }
    if (selectionMode) {
      onToggleSelect?.(conversation.id);
      return;
    }
    onTap(conversation.id);
  }, [selectionMode, onToggleSelect, onTap, conversation.id]);

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={(e) => {
        if (longPressTimer.current || didLongPress.current) e.preventDefault();
      }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors cursor-pointer text-left select-none ${
        selected
          ? "bg-messenger-lightBlue"
          : "hover:bg-gray-50 active:bg-gray-100"
      }`}
    >
      <div className="relative flex-shrink-0">
        {participant.avatarUrl && !imgError ? (
          <img
            src={participant.avatarUrl}
            alt={participant.name}
            className="w-14 h-14 rounded-full object-cover bg-gray-100"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg`}
          >
            {participant.avatar}
          </div>
        )}
        {participant.isOnline && !selectionMode && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
        {selectionMode && (
          <div className="absolute -bottom-0.5 -right-0.5">
            {selected ? (
              <div className="w-5 h-5 rounded-full bg-messenger-blue flex items-center justify-center animate-check-pop border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
            )}
          </div>
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
      {conversation.unread && !selectionMode && (
        <div className="w-3 h-3 rounded-full bg-messenger-blue flex-shrink-0" />
      )}
    </button>
  );
}
