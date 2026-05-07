"use client";

import { useState } from "react";

type InboxInsightsBannerProps = {
  inactiveCount: number;
  onReview: () => void;
  onDismiss: () => void;
};

export default function InboxInsightsBanner({ inactiveCount, onReview, onDismiss }: InboxInsightsBannerProps) {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      className={`mx-3 my-2 overflow-hidden ${dismissing ? "animate-banner-dismiss" : "animate-slide-down"}`}
    >
      <div className="relative rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-3.5 shadow-sm">
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          {/* Sparkle icon */}
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <p className="text-white text-sm font-semibold">
              {inactiveCount} inactive business chats
            </p>
            <p className="text-white/80 text-xs mt-0.5">
              From ads you never replied to
            </p>
          </div>

          {/* Review button */}
          <button
            onClick={onReview}
            className="flex-shrink-0 px-4 py-1.5 bg-white rounded-full text-sm font-semibold text-purple-600 hover:bg-white/90 transition-colors"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
}
