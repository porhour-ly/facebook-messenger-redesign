"use client";

import { useState } from "react";

type ReviewCardProps = {
  inactiveCount: number;
  onArchiveAll: () => void;
  onReview: () => void;
  onDismiss: () => void;
};

export default function ReviewCard({ inactiveCount, onArchiveAll, onReview, onDismiss }: ReviewCardProps) {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(onDismiss, 300);
  };

  return (
    <div className={`mx-4 my-2 overflow-hidden ${dismissing ? "animate-banner-dismiss" : "animate-fade-in"}`}>
      <div className="relative rounded-xl bg-[#F5F5F5] border border-gray-200 px-4 py-3.5">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="text-[14px] font-semibold text-gray-800 pr-8">
          {inactiveCount} chats from ads
        </p>
        <p className="text-[12px] text-gray-500 mt-0.5 leading-snug pr-8">
          Businesses that messaged you after you tapped an ad. You haven&apos;t replied to any of them.
        </p>
        <div className="flex items-center gap-2.5 mt-3">
          <button
            onClick={onReview}
            className="flex-1 py-2 text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Review
          </button>
          <button
            onClick={onArchiveAll}
            className="flex-1 py-2 text-[13px] font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Archive all
          </button>
        </div>
      </div>
    </div>
  );
}
