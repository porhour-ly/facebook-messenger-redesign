"use client";

import { useRef, useState, useCallback } from "react";
import { Conversation } from "@/data/conversations";
import ConversationRow from "./ConversationRow";

type SwipeableConversationRowProps = {
  conversation: Conversation;
  showLabel: boolean;
  onTap: (id: string) => void;
  onArchive: (id: string) => void;
  showSwipeHint: boolean;
  onSwipeHintShown: () => void;
};

export default function SwipeableConversationRow({
  conversation,
  showLabel,
  onTap,
  onArchive,
  showSwipeHint,
  onSwipeHintShown,
}: SwipeableConversationRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [slidingOut, setSlidingOut] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const isVerticalScroll = useRef(false);
  const [hintDone, setHintDone] = useState(false);

  const containerWidth = () => containerRef.current?.offsetWidth || 400;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    isDragging.current = false;
    isVerticalScroll.current = false;
    setDragging(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isVerticalScroll.current) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Determine scroll direction on first significant move
    if (!isDragging.current && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;

    if (!isDragging.current) {
      if (Math.abs(dy) > Math.abs(dx)) {
        isVerticalScroll.current = true;
        return;
      }
      isDragging.current = true;
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }

    // Only allow left swipe (negative dx)
    const clampedX = Math.min(0, dx);
    setOffsetX(clampedX);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) {
      setOffsetX(0);
      setDragging(false);
      return;
    }

    isDragging.current = false;
    setDragging(false);

    const threshold = containerWidth() * 0.4;
    if (Math.abs(offsetX) >= threshold) {
      setSlidingOut(true);
      setTimeout(() => onArchive(conversation.id), 300);
    } else {
      setOffsetX(0);
    }
  }, [offsetX, onArchive, conversation.id]);

  const handleArchiveButton = useCallback(() => {
    setSlidingOut(true);
    setTimeout(() => onArchive(conversation.id), 300);
  }, [onArchive, conversation.id]);

  // Handle hint animation end
  const handleHintAnimationEnd = useCallback(() => {
    setHintDone(true);
    onSwipeHintShown();
  }, [onSwipeHintShown]);

  if (slidingOut) {
    return <div className="animate-slide-out-left overflow-hidden" />;
  }

  const showHintAnimation = showSwipeHint && !hintDone;
  const revealWidth = Math.abs(offsetX);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Red background layer */}
      <div className="absolute inset-0 bg-red-500 flex items-center justify-end px-5">
        <button
          onClick={handleArchiveButton}
          className="flex flex-col items-center gap-1 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span className="text-xs font-semibold">Archive</span>
        </button>
      </div>

      {/* Swipeable row */}
      <div
        className={`relative bg-white ${!dragging ? "transition-transform duration-200" : ""}`}
        style={{
          transform: showHintAnimation ? undefined : `translateX(${offsetX}px)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onAnimationEnd={showHintAnimation ? handleHintAnimationEnd : undefined}
      >
        {showHintAnimation && (
          <div
            className="animate-swipe-hint"
            onAnimationEnd={handleHintAnimationEnd}
          >
            <ConversationRow
              conversation={conversation}
              showLabel={showLabel}
              onTap={onTap}
            />
          </div>
        )}
        {!showHintAnimation && (
          <ConversationRow
            conversation={conversation}
            showLabel={showLabel}
            onTap={onTap}
          />
        )}
      </div>

      {/* Swipe hint overlay — fades out via CSS after 1.2s */}
      {showHintAnimation && (
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-6 animate-hint-label">
          <div className="bg-gray-900/80 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Swipe to archive
          </div>
        </div>
      )}
    </div>
  );
}
