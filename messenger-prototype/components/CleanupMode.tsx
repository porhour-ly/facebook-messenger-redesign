"use client";

import { useState } from "react";
import { Conversation } from "@/data/conversations";

type CleanupModeProps = {
  conversations: Conversation[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onArchiveSelected: () => void;
  onKeep: (id: string) => void;
  onClose: () => void;
  totalOriginalCount: number;
};

const avatarColors = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500",
  "bg-orange-500", "bg-teal-500", "bg-indigo-500", "bg-red-500",
];

function getAvatarColor(id: string) {
  const index = parseInt(id.replace(/\D/g, "")) % avatarColors.length;
  return avatarColors[index];
}

function CleanupRow({
  conversation,
  selected,
  onToggle,
  onKeep,
}: {
  conversation: Conversation;
  selected: boolean;
  onToggle: () => void;
  onKeep: () => void;
}) {
  const participant = conversation.participants[0];
  const colorClass = getAvatarColor(participant.id);
  const [imgError, setImgError] = useState(false);
  const messageCount = conversation.messages.length;

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          selected
            ? "bg-messenger-blue border-messenger-blue"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {selected && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Avatar */}
      <div className="flex-shrink-0">
        {participant.avatarUrl && !imgError ? (
          <img
            src={participant.avatarUrl}
            alt={participant.name}
            className="w-12 h-12 rounded-full object-cover bg-gray-100"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-base`}>
            {participant.avatar}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{participant.name}</p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{conversation.lastMessage}</p>
        <p className="text-xs text-gray-400 mt-0.5">{messageCount} message{messageCount !== 1 ? "s" : ""} from ad</p>
      </div>

      {/* Keep button */}
      <button
        onClick={onKeep}
        className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        Keep
      </button>
    </div>
  );
}

export default function CleanupMode({
  conversations,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onArchiveSelected,
  onKeep,
  onClose,
  totalOriginalCount,
}: CleanupModeProps) {
  const processedCount = totalOriginalCount - conversations.length;
  const progress = totalOriginalCount > 0 ? (processedCount / totalOriginalCount) * 100 : 0;
  const allSelected = conversations.length > 0 && selectedIds.size === conversations.length;
  const isComplete = conversations.length === 0;

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col animate-slide-up">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900">Inbox Cleanup</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4.5 h-4.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{processedCount} of {totalOriginalCount} processed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-messenger-blue rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {isComplete ? (
        /* Completion screen */
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 animate-check-pop">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">All clean!</h3>
          <p className="text-gray-500 text-sm mb-8">
            Your inbox is tidied up. Archived chats can be found in your archive.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-messenger-blue text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          {/* Select all bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <button
              onClick={allSelected ? onDeselectAll : onSelectAll}
              className="text-sm font-semibold text-messenger-blue"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
            <span className="text-xs text-gray-500">
              {selectedIds.size} selected
            </span>
          </div>

          {/* Conversation checklist */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <CleanupRow
                key={conv.id}
                conversation={conv}
                selected={selectedIds.has(conv.id)}
                onToggle={() => onToggleSelect(conv.id)}
                onKeep={() => onKeep(conv.id)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <button
              onClick={onArchiveSelected}
              disabled={selectedIds.size === 0}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
                selectedIds.size > 0
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Archive Selected ({selectedIds.size})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
